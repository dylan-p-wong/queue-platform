package input

type QueueEntryInput struct {
	Redirect string `json:"redirect" binding:"required"`
}
