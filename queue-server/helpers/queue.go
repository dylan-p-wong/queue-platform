package helpers

import (
	"dylan/queue/models"
	"dylan/queue/db"
)

func CalculatePlace(qe models.QueueEntry) int {
	var qes []models.QueueEntry

	result := db.GetDB().Where("created_at < ?", qe.CreatedAt).Where("queue_id = ?", qe.QueueID).Where("status = ?", "WAITING").Find(&qes)

	return int(result.RowsAffected) + 1;
}
