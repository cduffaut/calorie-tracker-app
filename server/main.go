package main

import (
	"os"

	"github.com/cduffaut/calorie-tracker-app/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())

	router.POST("/entry/create", routes.AddEntry)
	router.GET("/entries/", routes.GetEntries)
	router.GET("/entry/:id", routes.GetEntryById)

	router.PUT("/entry/update/:id", routes.UpdateEntry)
	router.PUT("/calorie/upadte/:id", routes.UpdateCalories)
	router.PUT("/weight/upadte/:id", routes.UpdateWeightGrams)
	router.DELETE("/entry/delete/:id", routes.DeleteEntry)

	router.Run(":" + port)
}
