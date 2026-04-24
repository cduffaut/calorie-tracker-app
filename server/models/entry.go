package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Entry struct {
	ID          primitive.ObjectID `bson:"_id"                json:"id"`
	ProductName string             `bson:"product_name"       json:"product_name"`
	Calories    float64            `bson:"calories"           json:"calories"`
	WeightGrams float64            `bson:"weight_grams"       json:"weight_grams"`
}
