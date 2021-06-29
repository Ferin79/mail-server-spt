
# Mail Service

A Custom Mail Server which can be used for sending mails. APIs for sending mails with different programming languages along with attachments and admin dashboard for monitoring.

**sendGrid Mail Service as backup if custom server stops**
## Features

- Custom Mail Server.
- NodeJs for Sending Mails from Custom Mail Server.
- Admin Dashboard for Project Creation and management.
- Option to use SendGrid as Mail Server

  
## Demo

[Admin Dashboard](https://spt-mail.netlify.app/dashboard)

**Testing Credentails:**

 - Username: ferinpatel79@gmail.com
 - Password: 1234567890


## API Reference

#### Get all items

```http
  POST https://mail-server-spt.herokuapp.com/mail
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `to`      | `string` | **Required**               |
| `subject` | `string` | **Required**               |
| `html`    | `string` | **Required**               |
| `apiKey`  | `string` | **Required**  (can be get from admin dashboard)|
| `files`   | `Files`  | **Optional** (Array of Attachments)|
| `useOwnCred`| `boolean` | **Optional** (If you want to use own sendGrid Crendential)|




  
## Tech Stack

**Mail Server:** CyberPanel, AWS EC2

**Client:** React, Chakra-UI, React-Query

**API Server:** Node, Express, Typeorm, PostgreSQL


  
## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

  