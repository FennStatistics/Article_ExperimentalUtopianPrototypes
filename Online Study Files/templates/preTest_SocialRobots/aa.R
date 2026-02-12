# Load libraries
library(ggplot2)
library(dplyr)
library(mlr3)
library(mlr3learners)
library(gridExtra)

# ============================================================================
# MARKETING ANALYSIS: MTCARS DATASET
# ============================================================================

# 1. DATA PREPARATION & EDA
data(mtcars)
mtcars$car_name <- rownames(mtcars)
mtcars <- mtcars %>%
    mutate(
        efficiency = cut(mpg, breaks = 3, labels = c("Low", "Medium", "High")),
        power_level = cut(hp, breaks = 3, labels = c("Low", "Medium", "High"))
    )

# 2. VISUALIZATIONS
# Market segmentation by MPG and HP
p1 <- ggplot(mtcars, aes(x = hp, y = mpg, color = factor(cyl), size = wt)) +
    geom_point(alpha = 0.6) +
    facet_wrap(~am, labeller = labeller(am = c("0" = "Automatic", "1" = "Manual"))) +
    labs(title = "Vehicle Performance Market Segments",
             x = "Horsepower", y = "MPG", color = "Cylinders", size = "Weight (1000 lbs)") +
    theme_minimal() + theme(legend.position = "bottom")
p1
# Distribution analysis
p2 <- ggplot(mtcars, aes(x = efficiency, fill = power_level)) +
    geom_bar(position = "dodge") +
    labs(title = "Market Distribution by Efficiency & Power", x = "Fuel Efficiency", y = "Count") +
    theme_minimal()

# Price proxy analysis (using wt as proxy)
p3 <- ggplot(mtcars, aes(x = wt, y = qsec, color = efficiency)) +
    geom_point(size = 3, alpha = 0.7) +
    geom_smooth(method = "lm", se = TRUE, alpha = 0.2) +
    labs(title = "Weight vs Acceleration Performance", x = "Weight", y = "1/4 Mile Time") +
    theme_minimal()

grid.arrange(p1, p2, p3, ncol = 2)

# 3. ML PREDICTION WITH MLR3
# Target: Predict fuel efficiency class
task <- as_task_classif(mtcars %>% select(-car_name, -efficiency), 
                                                target = "am", positive = "1")

# Create learner and train/test split
learner <- lrn("classif.rpart")
split <- partition(task, ratio = 0.8)

# Train model
learner$train(task, split$train)

# Predict and evaluate
pred <- learner$predict(task, split$test)
print(pred$confusion)
print(paste("Accuracy:", round(pred$score(msr("classif.acc")), 3)))