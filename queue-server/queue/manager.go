package queue

var qm *QueueManager

type QueueManager struct {  
	queues []*Queue
}

func Init() {
	qm = &QueueManager{}
}

func (qm *QueueManager) QueueStopped(uuid string) bool {
	foundIndex := -1

	for i, q := range qm.queues {
		if q.ID == uuid {
			foundIndex = i
		}
	}

	if foundIndex == -1 {
		return true
	}

	return qm.queues[foundIndex].Stopped
}

func (qm *QueueManager) AddQueue(uuid string) {
	foundIndex := -1

	for i, q := range qm.queues {
		if q.ID == uuid {
			foundIndex = i
		}
	}

	if foundIndex >= 0 {
		return
	}

	q := Queue{ ID: uuid, Stopped: true }
	qm.queues = append(qm.queues, &q)
}

func (qm *QueueManager) StartQueue(uuid string) {
	
	foundIndex := -1

	for i, q := range qm.queues {
		if q.ID == uuid {
			foundIndex = i
		}
	}

	if foundIndex == -1 {
		qm.AddQueue(uuid)
	}

	for i, q := range qm.queues {
		if q.ID == uuid {
			qm.queues[i].StartQueue()
		}
	}
}

func (qm *QueueManager) StopQueue(uuid string) {
	for i, q := range qm.queues {
		if q.ID == uuid {
			qm.queues[i].StopQueue()
		}
	}
}

func GetQueueManager() *QueueManager {
	return qm
}
