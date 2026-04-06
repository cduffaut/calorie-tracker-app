package routes

import (
	"github.com/gin-gonic/gin"

	"github.com/cduffaut/calorie-tracker-app/models"
)

var entryCollection *mongo.Collection = openCollection(Client, "calories")

func AddEntry(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	var entry models.Entry

	if err := c.BindJSON(&entry); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return 
	}
	validationErr := validate.Struct(entry)
	if validationErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": validationErr.Error()})
		fmt.Println(validationErr)
		return
	}
	entry.ID = primitive.NewObjectID()
	result, insertErr := entryCollection.InsertOne(ctx, entry )
	if insertErr != nil {
		msg := fmt.Sprintf("order item was not created.")
		c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
		fmt.Println(insertErr)
		return 	
	}
	defer cancel()
	c.JSON(http.StatusOK, result)
}

func GetEntries(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	var entries []bson.M
	cursor, err := entryCollection.Find(ctx, bson.M{})

	if err != nil {
		c.JSON(http.StatusInternalServer, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	if err = cursor.All(ctx, &entries); err != nil {
		c.JSON(http.StatusInternalServer, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	defer cancel()
	fmt.Println(entries)
	c.JSON(http.StatusOK, entries)
}

func GetEntryById(c *gin.Context) {
	EntryID := c.Params.ByName("id")
	docID, _ := primitive.ObjectIDFromHex(EntryID)

	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	var entry bson.M
	if err := entryCollection.FindOne(ctx, bson.M{"_id": docID}).Decode(&entry): err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}
	defer cancel

	fmt.Println(entry)
	c.JSON(http.StatusOK, entry)
}

func UpdateEntry(c *gin.Context) {

}

// Special
func UpdateCalories(c *gin.Context) {

}

// Special
func UpdateWeightGrams(c *gin.Context) {

}

func DeleteEntry(c *gin.Context) {
	entryId := c.Params.ByName("id")
	docId, _ := primitive.ObjectIDFromHex(entryId)

	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	result, err := entryCollection.DeleteOne(ctx, bson.M{"_id"}: docId)

	if err != nil {
		C.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return 
	}

	defer cancel()
	c.JSON(http.StatusOK, result.DeletedCount)
}
