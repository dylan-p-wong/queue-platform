package controller

import (
	"dylan/queue/db"
	"dylan/queue/input"
	"dylan/queue/models"
	"dylan/queue/queue"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type QueueController struct {
}

func (c *QueueController) Create(context *gin.Context) {
	user_id := context.MustGet("user_id").(string)

	var input input.QueueInput

	err := context.ShouldBindJSON(&input)

	fmt.Println(err)

	if err != nil {
		context.JSON(400, gin.H{
			"error": "Incorrect input",
		})
		return
	}

	q := models.Queue{Title: input.Title, Description: input.Description, PassRate: input.PassRate, TokenTime: input.TokenTime, Redirect: input.Redirect, UserID: uuid.MustParse(user_id) }

	db.GetDB().Create(&q)

	queue.GetQueueManager().AddQueue(q.ID.String())

	context.JSON(200, q)
}

func (c *QueueController) Start(context *gin.Context) {
	var q models.Queue

	result := db.GetDB().First(&q, "id = ?", context.Param("id"))

	if result.Error != nil {
		context.JSON(404, gin.H{
			"error": "Not found",
		})
		return
	}

	queue.GetQueueManager().StartQueue(q.ID.String())

	context.JSON(200, q)
}

func (c *QueueController) Stop(context *gin.Context) {
	var q models.Queue

	result := db.GetDB().First(&q, "id = ?", context.Param("id"))

	if result.Error != nil {
		context.JSON(404, gin.H{
			"error": "Not found",
		})
		return
	}

	queue.GetQueueManager().StopQueue(q.ID.String())

	context.JSON(200, q)
}

func (c *QueueController) FindAll(context *gin.Context) {

	var queues []models.Queue

	db.GetDB().Preload("QueueEntries").Find(&queues)

	for i, q := range queues {
		queues[i].Stopped = queue.GetQueueManager().QueueStopped(q.ID.String())
	}

	context.JSON(200, queues)
}

func (c *QueueController) Find(context *gin.Context) {
	var q models.Queue

	result := db.GetDB().Preload("QueueEntries").First(&q, "id = ?", context.Param("id"))

	if result.Error != nil {
		context.JSON(404, gin.H{
			"error": "Not found",
		})
		return
	}

	q.Stopped = queue.GetQueueManager().QueueStopped(q.ID.String())

	context.JSON(200, q)
}
