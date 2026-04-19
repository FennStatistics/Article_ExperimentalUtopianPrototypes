########################################
# test number of factors
########################################
# label = labelLatent
# regEx = regularExp
# dataset = dataset

dimensionalityTest <- function(label, regEx, dataset){
  tmp_dat <- dataset[, str_detect(string = colnames(dataset),
                                  pattern = regEx)]

  if(label == "Overall"){
    fa_parallel_out <- fa.parallel(x = tmp_dat, fm = "minres", fa="both", main = label, cor = "cor")
  }else{


    res <- try(fa_parallel_out <- fa.parallel(x = tmp_dat,
                                              fm = "minres",
                                              fa="both", main = label,
                                              cor = "poly"))
    if(inherits(res, "try-error")){
      print("use instead of polychoric correlations pearson correlations")
      fa_parallel_out <- fa.parallel(x = tmp_dat,
                                     fm = "minres",
                                     fa="both", main = label,
                                     cor = "cor")
    }
  }

  cat(label, "\n")
  cat("Number of components: ", fa_parallel_out$ncomp, "\n")
  cat("\n")

  return(fa_parallel_out)
}



########################################
# explorative factor analysis
########################################
## args
# i = 2
# label = labelLatent
# regEx = regularExp
# dataset = dataset
# nfac = 1
explorativeFactorAnalysis <- function(label, regEx, dataset, nfac = 1, showCronbach = FALSE){
  
  # select items by regex, excluding already-computed means
  tmp_dat <- dataset[, stringr::str_detect(colnames(dataset), regEx), drop = FALSE]
  tmp_dat <- tmp_dat[, !stringr::str_detect(colnames(tmp_dat), "^mean_"), drop = FALSE]
  
  # keep only numeric-like columns (polychoric wants ordered factors or numerics)
  tmp_dat <- as.data.frame(tmp_dat)
  
  # drop columns with zero variance (breaks correlations/KMO)
  is_zero_var <- vapply(tmp_dat, function(x) stats::var(as.numeric(x), na.rm = TRUE) == 0, logical(1))
  if(any(is_zero_var, na.rm = TRUE)) {
    message("Dropping zero-variance items: ", paste(names(tmp_dat)[is_zero_var], collapse = ", "))
    tmp_dat <- tmp_dat[, !is_zero_var, drop = FALSE]
  }
  
  # ---- correlations + FA ----
  if (label == "Overall") {
    
    tmp_cor <- stats::cor(tmp_dat, use = "pairwise.complete.obs")
    tmp_cor <- psych::cor.smooth(tmp_cor)  # helps if not positive definite
    
    tmp_fa_out <- psych::fa(r = tmp_cor, nfactors = nfac, rotate = "promax", cor = "cor")
    
  } else {
    
    tmp_cor_obj <- try(psych::polychoric(tmp_dat), silent = TRUE)
    
    if(inherits(tmp_cor_obj, "try-error")) {
      message("Using Pearson correlations instead of polychoric correlations.")
      tmp_cor <- stats::cor(tmp_dat, use = "pairwise.complete.obs")
      tmp_cor <- psych::cor.smooth(tmp_cor)
      
      tmp_fa_out <- psych::fa(r = tmp_cor, nfactors = nfac, rotate = "promax", cor = "cor")
      
    } else {
      tmp_cor <- tmp_cor_obj$rho
      tmp_cor <- psych::cor.smooth(tmp_cor)
      
      tmp_fa_out <- psych::fa(r = tmp_cor, nfactors = nfac, rotate = "promax", cor = "poly")
    }
  }
  
  # ---- fit stats ----
  tmp_fa_out_fs <- psych::factor.stats(r = tmp_cor, f = tmp_fa_out)
  
  # ---- factor scores ----
  # (scores need raw data, not correlation matrix)
  score_method <- if(nfac == 1) "Thurstone" else "tenBerge"
  tmp_fs <- psych::factor.scores(tmp_dat, tmp_fa_out, method = score_method)
  
  # ---- reliability / diagnostics ----
  if(showCronbach){
    rel_cronbach <- psych::alpha(tmp_cor)
    cat("Cronbachs Alpha:", round(rel_cronbach$total$raw_alpha, 2), "\n")
  }
  
  # KMO can produce NA when correlations are problematic; handle safely
  tmpKMO <- psych::KMO(tmp_cor)
  
  low_items <- which(tmpKMO$MSAi < .6 & !is.na(tmpKMO$MSAi))
  if(length(low_items) > 0){
    cat("KMO criteria too low (< .6) for:\n",
        paste(names(tmpKMO$MSAi)[low_items], collapse = ", "), "\n",
        "mean KMO:", round(tmpKMO$MSA, 2), "\n")
  }
  
  return(list(fa = tmp_fa_out, fit = tmp_fa_out_fs, scores = tmp_fs, cor = tmp_cor, KMO = tmpKMO))
}
