# Marketing Analysis: mtcars Dataset
# Step-by-step complexity increase with visualizations
library(tidyverse)
library(ggplot2)
# library(dplyr)
library(gridExtra)
1+1
# Data preparation
data(mtcars)
mtcars$car_name <- rownames(mtcars)
p1
# ============================================================
# LEVEL 1: Basic Descriptive Statistics
# ============================================================
cat("\n=== LEVEL 1: Descriptive Statistics ===\n")
summary(mtcars[, c("mpg", "hp", "price")])

p1 <- ggplot(mtcars, aes(x = mpg)) +
    geom_histogram(bins = 10, fill = "steelblue", color = "black") +
    labs(title = "Distribution of Fuel Efficiency", x = "MPG", y = "Count") +
    theme_minimal()

# ============================================================
# LEVEL 2: Bivariate Analysis
# ============================================================
cat("\n=== LEVEL 2: Relationship Analysis ===\n")
cor(mtcars$mpg, mtcars$hp)

p2 <- ggplot(mtcars, aes(x = hp, y = mpg, color = factor(cyl))) +
    geom_point(size = 3) +
    geom_smooth(method = "lm", se = FALSE) +
    labs(title = "MPG vs Horsepower by Cylinders", color = "Cylinders") +
    theme_minimal()

# ============================================================
# LEVEL 3: Segmentation Analysis
# ============================================================
cat("\n=== LEVEL 3: Market Segmentation ===\n")
mtcars_segment <- mtcars %>%
    mutate(segment = case_when(
        mpg > 25 ~ "Efficient",
        mpg > 15 ~ "Standard",
        TRUE ~ "Premium"
    )) %>%
    group_by(segment) %>%
    summarise(
        avg_mpg = mean(mpg),
        avg_hp = mean(hp),
        count = n()
    )

print(mtcars_segment)

p3 <- ggplot(mtcars_segment, aes(x = segment, y = count, fill = segment)) +
    geom_bar(stat = "identity") +
    labs(title = "Market Segment Size", x = "Segment", y = "Count") +
    theme_minimal() +
    theme(legend.position = "none")

# ============================================================
# LEVEL 4: Advanced Multi-dimensional Analysis
# ============================================================
cat("\n=== LEVEL 4: Multi-dimensional Analysis ===\n")

mtcars_advanced <- mtcars %>%
    mutate(
        segment = case_when(
            mpg > 25 ~ "Efficient",
            mpg > 15 ~ "Standard",
            TRUE ~ "Premium"
        ),
        transmission = factor(am, labels = c("Automatic", "Manual"))
    ) %>%
    group_by(segment, transmission) %>%
    summarise(
        avg_mpg = mean(mpg),
        avg_hp = mean(hp),
        avg_wt = mean(wt),
        n = n(),
        .groups = 'drop'
    )

print(mtcars_advanced)

p4 <- ggplot(mtcars_advanced, aes(x = segment, y = avg_mpg, fill = transmission)) +
    geom_bar(stat = "identity", position = "dodge") +
    labs(title = "Average MPG by Segment and Transmission", x = "Segment", y = "Avg MPG") +
    theme_minimal()

# ============================================================
# LEVEL 5: Predictive Insights & ROI Analysis
# ============================================================
cat("\n=== LEVEL 5: Predictive Model ===\n")

model <- lm(mpg ~ hp + wt + factor(cyl), data = mtcars)
summary(model)

mtcars_pred <- mtcars %>%
    mutate(predicted_mpg = predict(model))

p5 <- ggplot(mtcars_pred, aes(x = predicted_mpg, y = mpg)) +
    geom_point(size = 2, color = "steelblue") +
    geom_abline(intercept = 0, slope = 1, color = "red", linetype = "dashed") +
    labs(title = "Model Predictions vs Actual MPG", x = "Predicted MPG", y = "Actual MPG") +
    theme_minimal()

# ============================================================
# Visualization Summary
# ============================================================
grid.arrange(p1, p2, p3, p4, p5, ncol = 2)

cat("\n=== Analysis Complete ===\n")


# ============================================================
# LEVEL 6: Machine Learning with mlr3
# ============================================================
cat("\n=== LEVEL 6: Machine Learning with mlr3 ===\n")

library(mlr3)
library(mlr3learners)

# Create task
task <- as_task_regr(mtcars[, c("mpg", "hp", "wt", "cyl")], target = "mpg")

# Split data
set.seed(123)
splits <- partition(task, ratio = 0.8)

# Train multiple models
learners <- list(
    lrn("regr.lm"),
    lrn("regr.rpart"),
    lrn("regr.ranger")
)

results <- lapply(learners, function(learner) {
    learner$train(task, row_ids = splits$train)
    pred <- learner$predict(task, row_ids = splits$test)
    list(
        model = learner$id,
        rmse = pred$score(msr("regr.rmse")),
        mae = pred$score(msr("regr.mae"))
    )
})

comparison_df <- do.call(rbind, lapply(results, as.data.frame))
print(comparison_df)

p6 <- ggplot(comparison_df, aes(x = model, y = rmse, fill = model)) +
    geom_bar(stat = "identity") +
    labs(title = "Model Performance Comparison (RMSE)", x = "Model", y = "RMSE") +
    theme_minimal() +
    theme(legend.position = "none")

print(p6)


p3
print(p4)

