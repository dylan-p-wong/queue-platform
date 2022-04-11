package queue

import (
	"fmt"
	"time"
	"dylan/queue/db"
	"dylan/queue/models"
	"dylan/queue/helpers"
)

type Queue struct {  
	ID string
	Stopped bool
}

func (q *Queue) StartQueue() {
	fmt.Println(q.Stopped)
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
				fmt.Println(q.ID, q.Stopped);
				time.Sleep(time.Millisecond * 1000);
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
		qe.RedirectToken = helpers.GenerateRedirectToken(qe.ID.String(), qe.QueueID.String(), 10)

		db.GetDB().Save(&qe)
	}
}
