package input

type QueueInput struct {
	Title string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
}
