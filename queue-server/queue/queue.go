package queue

import (
	"dylan/queue/db"
	"dylan/queue/helpers"
	"dylan/queue/models"
	"time"
	"math"
)

type Queue struct {
	ID        string
	Stopped   bool
	PassRate  int
	TokenTime int
}

func (q *Queue) StartQueue() {
	if !q.Stopped {
		return
	}

	q.Stopped = false

	go func() {
		for i := 1; true; i++ {
			if q.Stopped {
				return
			}
			q.LetEntriesPass(1)

			passRate := math.Max(1000, float64(q.PassRate))

			time.Sleep(time.Millisecond * time.Duration(passRate))
		}
	}()
}

func (q *Queue) StopQueue() {
	q.Stopped = true
}

func (q *Queue) LetEntriesPass(number int) {
	var qe models.QueueEntry

	result := db.GetDB().Limit(number).Where("status = ?", "WAITING").First(&qe)

	if result.Error == nil {
		qe.Status = "PASSED"
		qe.RedirectToken = helpers.GenerateRedirectToken(qe.ID.String(), qe.QueueID.String(), int(math.Max(10 * 60 * 1000, float64(q.TokenTime))))

		db.GetDB().Save(&qe)
	}
}
