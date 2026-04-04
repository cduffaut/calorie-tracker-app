package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Entry struct {
	ID              primitive.ObjectID `bson:"id"`
	ProductName     *string            `json:"dish"`
	CaloriesPer100g *float64
	WeightGrams     *float64
}
