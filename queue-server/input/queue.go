package input

type QueueInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	Active      bool   `json:"active"`
	PassRate    int    `json:"pass_rate" binding:"required"`
	TokenTime   int    `json:"token_time" binding:"required"`
	Redirect    string `json:"redirect_domain" binding:"required"`
}
