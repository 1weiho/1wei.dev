export interface Post {
  title: string
  date: string
  content: string
}

export const posts: Post[] = [
  {
    title: 'Building My First Raycast AI Extension for GitLab',
    date: '2025-09-21',
    content: `Recently, my company upgraded everyone's laptops to MacBooks. I had been developing backend services on Ubuntu, but this change meant one exciting thing for me: I could finally use Raycast at work!

Since we use a self-hosted GitLab instance, I started exploring the GitLab Raycast Extension. It blew me away with how polished and complete it already was. But I noticed one limitation — it wasn't yet an AI Extension. That meant I couldn't just ask, for example, "Summarize my work progress for the week" and let the AI handle it. That's when the idea struck me: why not build it myself and turn it into an AI-powered Extension?

I've developed extensions before (like svgl extension), but AI Extensions were new territory. This felt like the perfect chance to learn. And thankfully, Raycast provides fantastic documentation. With that, I jumped right in.

The Core Concept: Tools

The heart of an AI Extension is the tool. If you've worked with MCP, it's a similar concept — basically, predefined actions that the LLM can call. Creating a tool is simple: just add a TypeScript file inside src/tools.

For my first attempt, I built a tool to search GitLab projects. The neat thing here is that thanks to this extension's existing GitLab integration, I could just reuse the gitlab helper. And notice the JSDoc comments above each parameter — those aren't just for humans, they help the AI understand what the arguments mean!

Once the tool was ready, I exported it via src/tools/index.ts and finally registered it in package.json. At this point, I could already test it inside Raycast, and to my delight — it just worked. It's pretty magical how smoothly the API handles the LLM integration.

Adding Confirmation: Closing Issues

For my next tool, I wanted to let AI close GitLab issues. But since this is a potentially destructive action, I needed to add confirmation, keeping the human in the loop. The confirmation step asks the user to review the issue details before closing it. This way, the AI doesn't accidentally close the wrong issue — pretty slick!

A Handy Shortcut: Opening in Browser

Here's a fun little trick I added: an open-in-browser tool. This lets the AI find something for me, then instantly open it in my browser. It's small, but it makes the workflow feel seamless.

Testing With Evals

One of the coolest parts of the process was writing evals. These are tests for your AI Extension that check whether the AI calls the right tools with the right parameters when given natural language input. In the second test, the AI first finds the project ID using search-projects, then uses search-issues to look up the specific bug. It's fascinating to watch the AI follow the chain of tools you designed. And once they all pass, you know your extension is robust and ready.

Adding Instructions in ai.json

One nice bonus of using ai.json file is that besides writing evals, you can also add instructions. These guide the AI on how to interact with your extension. This makes the interaction feel smarter and more natural — like teaching the AI how you want it to behave.

Wrapping Up

That's it! With just a few tools and some evals, I had turned a traditional Raycast Extension into an AI Extension that users can interact with naturally — making the GitLab integration much more powerful. The developer experience is honestly delightful, and I'm amazed at how easy Raycast makes it.`,
  },
  {
    title: 'Tokyo AI Hackathon',
    date: '2025-11-22',
    content: `Last month, Yen and I flew to Tokyo to join the Tokyo AI Hackathon, hosted by Raycast Community Japan. It was my first time traveling abroad for a community event, so the excitement was off the charts.

We arrived early on the day of the event to meet Thomas, Pedro, and Stephanie at their hotel. After following Raycast for so long and only seeing them on X or YouTube, finally meeting them in person felt surreal, almost dreamlike.

The Hackathon

The challenge of the hackathon was simple but thrilling: build a Raycast AI Extension on the spot, and see who could come up with the most creative and impactful idea. I knew right away that I wanted to make something different — something that would stand out.

I wondered: Could I turn Raycast AI Chat into a real Vibe Coding tool through an AI Extension?

So I started building my first tool — list-dir. The moment it ran successfully and began listing the directory structure layer by layer, I got instantly hooked. From there, I added read-file, apply-edit, grep, and other tools commonly used by agents.

Bit by bit, it started behaving like a mini version of Cursor: it could understand my project, follow my instructions, and even apply changes directly to the code.

After several rounds of judging, I was incredibly honored to win third place. Huge thanks to all the judges!

After the event

Beyond the hackathon itself, I was really happy that this event gave me the chance to finally meet Florentin from Vercel. He shared how Vercel uses Raycast internally and how they build their own extensions, which was super inspiring.

I also had great conversations with Javi and Matthew from Vercel. They talked with me about career paths, personal growth, and many other topics. Everyone was incredibly kind and open — it really meant a lot.

Wrap-up

I'm truly grateful to Raycast Community Japan for organizing such a fantastic event. This trip allowed me to meet so many amazing people and gave me the rare chance to practice speaking English, something I don't get to do often back in Taiwan.

I'm already looking forward to joining more international community events in the future. Can't wait to meet everyone again!`,
  },
]
