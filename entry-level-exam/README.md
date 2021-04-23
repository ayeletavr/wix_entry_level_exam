# Wix FED Entry Level Exam

Hi there!  
In this exam you will extend and add new features to a simplified ticketing system.
The task's main purpose is to test your ability to learn new topics and deliver high quality digital products. It combines building UI components and a touch of server development as well.

While no previous background is required to complete this task or to apply to this position, we do recommend getting to a basic level on the following subjects:
- JavaScript
- HTML & CSS
- React
- Node.js

## Getting Started
1. Make sure you have *Node.js* 10 or higher and *npm* 6 or higher installed
2. Install the project dependencies by running `npm install` from the project's directory (using a terminal)
3. Run the project by running `npm start`

You should now have the development version running on your computer and accessible via http://localhost:3000

## Tasks

The exam is split into 3 parts. The first part is about adding UI functionality. The second part goes a bit broader into the client-server integration and business logic.
The third part is about creativity and good "big-picture" intuition. 

**Note that 1d and 2c are bonus tasks**

### Part 1 - Ticket item improvements

1a. Our tickets list is only showing the title. Make it show the content as well, as following:  
![content](https://d2x3xhvgiqkx42.cloudfront.net/3d412e82-d97e-487e-b1a3-41a6bd24a05b/b9bd9ddb-c0bf-4b55-888e-747f0d6524c8/2019/09/27/6fec98b0-c9cd-4583-ac9f-eaf8983c4061/6043b7ba-e795-4807-8aca-9f693c0450eb.png)  

1b.
Some agents can't answer all tickets, and want an option to hide some.
Add a hide button that will hide the tickets from view. Make sure there is an option to restore it as well.
use "Hide" and "Restore" for those buttons respectively.
![hide tickets](https://d2x3xhvgiqkx42.cloudfront.net/3d412e82-d97e-487e-b1a3-41a6bd24a05b/b9bd9ddb-c0bf-4b55-888e-747f0d6524c8/2019/09/27/233c0170-fd67-4fb5-92c1-54de14d71350/b653f595-a0b7-4233-9259-a8b3d8d1d271.gif)


1c.
 Our ticket's data *might* also contain labels (tags), but we're not making use of them in our UI.
 Fix that by adding the labels according to the following design below.
 PS: feel free to add more labels to the data (data.json) if you need.
![labels](https://d2x3xhvgiqkx42.cloudfront.net/3d412e82-d97e-487e-b1a3-41a6bd24a05b/b9bd9ddb-c0bf-4b55-888e-747f0d6524c8/2019/09/27/6d307660-953a-4e00-a28d-ffbc48e68fb8/5d422571-d37c-4890-9837-4f786f1e5e10.png)


#### 1D - Bonus Task
1d. **Bonus** Step *a* wasn't enough - some tickets have long content. Add a show more / show less functionality when the content exceeds 3 lines, as following:  
![show more/less](https://d2x3xhvgiqkx42.cloudfront.net/3d412e82-d97e-487e-b1a3-41a6bd24a05b/b9bd9ddb-c0bf-4b55-888e-747f0d6524c8/2019/09/27/fd41c164-d566-471e-9723-e785b313845a/738cbaa0-93e8-4f02-861d-6fab92c608bd.gif)  
 

### Part 2 - List functionality

2a. 
 Agents desire to have ability to organize the list order.

1.Add 3 sort buttons with the following text "sort by date", "sort by title" and "sort by email"
that allow sorting the list by ticket creation date, title and creator email respectively,
make sure to highlights the current sort button.
2.On the `GET:Tickets` API add `sortBy` parameter to support sort.
3.Connect your client side buttons to that API call
4.(Bonus) Clicking on a currently active sort changes it's direction (Ascending / Descending).


2b. We're showing only 20 tickets but agents can swear there are more. Solve this problem.  
**Keep in mind the number of tickets is planned to grow exponentially very soon so make sure to think of a proper solution.**

#### 2c - Bonus Task
There is a need to find tickets created before/after a certain date, and our designer is on vacation to design proper UI for it. Change the search functionality so that when searching for `after:27/09/2019 api`, only tickets matching the word "api" created *after* 27/09/2019 will show. Add support for `before:[DATE]` and `from:[EMAIL]` as well.  

#### 2d - Bonus Task
We're doing great, the system now has more than 10M tickets but with success comes challenges and search became unbearable.
**Keep in mind the number of tickets is planned to grow exponentially very soon so make sure to think of a proper solution.**	We even had a complaint from an agent that told us he waited for a response more than 5 minutes, that's just CRAZY!
Let's create a search mechanism on steroids.
1.Add q query param `?superSearch=` to the `/tickets` API call and implement an *efficient* search solution, that gets a word as an input and return an array of matching tickets.
2. Connect your client side search bar to that API call

### Part 3 - Your extra touch
Think of a small addition to this project and make it happen. If you need inspiration, you can check out our real ticketing app at https://wix.com/wixanswers and grab some ideas from there ;)
It should involve adding something to the UI, or server (or both!).
A good rule of thumb for the effort here is that it should not exceed the time that it took you to perform Part 2.  
*Please describe the feature you've added on your email back to us*

*Note:* this step is also mandatory.

## General notes
- Test your work well. Think of edge cases. Think of how users will use it, and make sure your work is of high quality
- Stick to the best practices of the libraries used as much as possible
- This task involves both client and server code. Regardless of bonuses and part 3, in the end you should have touched both areas. If you haven't - you probably are not covering all our requirements.
- If you have any questions regarding the task itself or its environment, feel free to ask in the exam's e-mail. For general coding / technology questions, please consult stack overflow, forums and other sources of your choice.


## Submitting

1. Replace `yours@email.com` with your real email address in the `meta.txt` file.
2. Delete any `node_modules` directory from the project.
3. Zip the root directory (`entry-level-exam`) to a file called `entry-level-exam_{yourname}.zip` and send it back to the email you got from us. 
4. You can describe your extra touch (part 3), and any general notes you may have.
   Can be anything from challenges to something you feel was not done perfect,
   to something you're specially proud of.

![good luck](https://media.giphy.com/media/12XDYvMJNcmLgQ/giphy.gif)
