package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Entry struct {
	ID          primitive.ObjectID `bson:"_id"`
	ProductName string             `json:"product_name"`
	Calories    float64            `json:"calories"`
	WeightGrams float64            `json:"weight"`
}
