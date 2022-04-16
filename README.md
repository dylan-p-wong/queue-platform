# Queue Platform

A redirection based queue to handle high traffic serverside points on websites. Inspired by ticketing and sneaker queues. 

## About The Project

### Built With

* [Go](https://go.dev/)
* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [PostgreSQL](https://www.postgresql.org/)

## How it works

![alt text](https://i.imgur.com/JOOnUNg.png)

On a protected queue route, if a user does not have a valid queue token, middleware will redirect to the queue platform. While in this queue the user will receive updates on their place in line and an estimated wait time. After background processes have decided that a user can proceed, the platform will issue a queue token and the user will be redirected back to the original site. This token will be validated on the users next requests to the protected routes.

## Roadmap

- [x] Initial queue flow
- [x] Admin dashboard
- [x] First demo site
- [ ] Timed drops
- [ ] Bot protection features
- [ ] More integrations
