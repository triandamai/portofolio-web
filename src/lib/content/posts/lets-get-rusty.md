> **Disclaimer:** Everything in this post is a personal thought and opinion. You may agree, you may not — and that's completely fine. Let's agree to disagree, and keep it respectful. 🦀

---

## Where it all started

My first real encounter with programming wasn't through a course or a textbook. It was modding APKs and flashing custom ROMs on Android.

I was deep in that world — patching apps, modifying system files, exploring what was underneath. And at some point a thought just slipped into my head: *I've only ever been modifying things other people built. What if I actually built something myself?*

That question changed everything.

## Eclipse, NetBeans, and a language called Java

I started looking into how to build an Android app. The first tools I found were Eclipse, NetBeans, and Android Studio — and the language that came with all of them was **Java**.

I had zero programming background. No CS courses, no prior experience, nothing. Just curiosity and a lot of free time. I picked up Java and started learning from scratch.

## College hit different

Then I went to college, and in the very first semester there was a subject on algorithms and data structures. The language they used? **C**.

C is the hardest language I've ever had to learn — second only to Assembly. There's nothing holding your hand. You manage your own memory, you think in pointers, one wrong move and everything crashes. It was brutal but it taught me how the machine actually works underneath all the abstractions.

After C, I went through PHP, JavaScript, and a few others along the way. But no matter what I tried, **Java always felt like home**.

## Why Java felt like home

I don't fully understand why, even now. But I think it comes down to this: Java is an OOP language with rules that make sense once you understand them.

Type safety. Objects. Methods. Clear structure. Separation of concerns. Blueprints — in the form of interfaces and abstract classes — that force you to *think* about design before you write a single line of logic.

```java
interface UserRepository {
    User findById(long id);
    void save(User user);
}
class SqlUserRepository implements UserRepository {
    private final Database db;
    SqlUserRepository(Database db) { this.db = db; }
    @Override
    public User findById(long id) {
        return db.query("SELECT * FROM users WHERE id = ?", id, User.class);
    }
    @Override
    public void save(User user) { db.execute("INSERT INTO users ...", user); }
}
class UserService {
    private final UserRepository repo;
    UserService(UserRepository repo) { this.repo = repo; }
    public User getUser(long id) { return repo.findById(id); }
}
```

Coming from zero background, this was a revelation. Define the contract first. Implement it separately. The compiler enforces every rule — wrong type, missing method, it won't compile.

And then, of course, there was the **Garbage Collector (GC)**. In Java, memory management is completely automated. You instantiate an object with `new`, use it, and forget about it. Under the hood, the JVM runs a background thread that periodically inspects the heap, tracks active references, and automatically deallocates objects that are no longer reachable. For a beginner, this felt like absolute magic. I didn't need to worry about memory leaks, dangling pointers, or manually calling `free()` like I had to do in C. The GC was my safety net, ensuring I could focus purely on building things.

Java is the language that formed my entire mental model of what programming is supposed to be. Code should be structured. Things should have clear responsibilities. Architecture matters. From the moment I understood that, I couldn't un-know it.

I've been writing Java ever since, in one form or another.

## But no system is perfect

Java is great. Java is also heavy.

Give Java 8GB of RAM and it will find a way to use all of it. The JVM startup time, the memory overhead, the verbosity of certain patterns — these are real costs. You trade performance and resource efficiency for developer productivity and ecosystem maturity. That's a valid trade in a lot of contexts, but it's still a trade.

The Garbage Collector, while convenient, isn't free. It requires extra memory overhead to track references, and it introduces "Stop-the-World" pauses where the entire application pauses to clean up the heap. As a result, even a simple Java backend needs a relatively beefy container to run comfortably without running out of memory.

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuuFof6n24fdtlHURawv4KSmu__Ju5x1Me_L_aNvdPz_UpJO9dOj1OkCxY&s=10" alt="Java eating all your RAM" style="max-width: 300px; width: 100%; display: block; margin: 1.5rem auto; border-radius: 8px;" />

I accepted those tradeoffs for years without thinking too hard about them.

## Rust introduction — and how I got here

### 2018: Node.js and the rabbit hole

In 2018 I tried Node.js for the first time. And like usual, my curiosity didn't let me just use it — I had to know how it was built.

So I started digging. Turns out Node.js is built on top of V8, Google's JavaScript engine, and the binding layer involved Rust. That was the first time I actually read the word "Rust" in a technical context that mattered to me.

But at that point I didn't go further. I noted it. Filed it somewhere in the back of my head. And kept moving.

### The frontend years

For a while after that I was deep in the frontend ecosystem — building web things, exploring tooling, getting comfortable with the JavaScript world. I was enjoying it. There was always something new to try.

Then something interesting started happening. Tools that I was already using started mentioning Rust quietly in their release notes and blog posts. Vite, which I had been using for a while, started incorporating Rust-based tooling as part of their build pipeline. The ecosystem was changing underneath me without making a big announcement about it.

At some point a piece of news about Rust — I don't even remember exactly what it was — cut through the noise and landed. Something clicked. I decided it was time to actually try it.

### First contact

The first time I wrote Rust code, I knew immediately this was not going to be like anything I had tried before.

It introduced me to concepts I had never encountered in any of my years of programming. The **borrow checker**. **Ownership**. The idea that memory safety could be enforced at compile time, not at runtime — not through garbage collection, not through careful discipline, but by the language itself refusing to compile code that could cause a problem.

```rust
fn main() {
    let name = String::from("Trian");
    let greeting = say_hello(name); // ownership moves into the function
    println!("{}", greeting);
    // println!("{}", name); // compile error: value moved, can't use it here
}
fn say_hello(s: String) -> String {
    format!("Hello, {}!", s)
}
```

It was hard. The compiler was strict in ways that felt almost confrontational at first. You'd write something that looked completely reasonable and the compiler would reject it and explain exactly why your logic was unsafe. Not rude about it — actually quite helpful — but firm.

But I kept going. And the more I tried, the more the concepts started to settle.

**Ownership** is Rust's core memory management mechanism. In C/C++ you manage memory manually, which is error-prone. In Java, a garbage collector cleans it up at runtime. Rust takes a third path: Ownership. Every value in Rust has a variable called its *owner*. There can only be one owner at a time, and when the owner goes out of scope, the value is automatically dropped. If you pass a value to another function, the ownership "moves" to that function, and the original variable becomes invalid. This technical guarantee ensures memory safety with absolutely zero runtime overhead.

**Lifetimes** are the compiler's way of checking references (borrows). Since Rust lets you reference data without taking ownership, there is a risk of a "dangling reference" — a reference to data that has already been cleared from memory. To prevent this, Rust uses lifetimes (often annotated with syntax like `'a`). A lifetime is a static analysis parameter that proves to the borrow checker that a reference is valid for exactly as long as the data it points to is alive. It's essentially the compiler verifying: *you cannot use this reference because the owner of the data has already been dropped.*

**Traits** are Rust's approach to polymorphism and shared behavior, similar to Java's interfaces but much more powerful. Instead of inheriting behavior from parent classes, you define traits to describe capabilities (e.g., `Display` for things that can be printed, or `Serialize` for things that can be converted to JSON). You can implement traits for any type, including those you don't own (like standard library types), which enables highly composable, decoupled, and clean code architectures without the baggage of deep class inheritance trees.

**Macros** are metaprogramming tools that look like functions (marked with a `!`, like `println!`) but behave differently. Instead of executing code at runtime, macros expand into code at compile time. Rust macros are "hygienic", meaning they don't accidentally mess with variables in the scope they are called in. They allow you to write boilerplate-free code, perform compile-time checks, and define domain-specific syntax inside Rust itself.

On a personal note, beyond these technical features, **I absolutely love how Rust's syntax is written**. Coming from the verbosity of Java and the wildcard nature of JavaScript/TypeScript, Rust's syntax feels incredibly clean, expressive, and deliberate. Pattern matching with the `match` control flow is an absolute joy, expression-based blocks make code flow naturally without redundant return statements, and the functional-style combinators (`.map()`, `.and_then()`, `.filter()`) make data transformations look beautiful and readable.

## Running on Rust: Personal Projects and Small Infra

Over the last few years, I started transitioning to Rust for my personal projects and freelance work. I mostly build backend services with it, and the reasons are simple: memory footprint and deployment efficiency.

In the JVM world, a simple Spring Boot app might easily idle at 200MB–400MB of RAM. If you want to host five different microservices for various side projects, you'd need a beefy server just to keep them running. With Rust, a compiled binary is extremely small and typically idles at a mere 10MB–20MB of RAM. It handles high throughput with almost zero CPU overhead, and compile-time checks mean it rarely crashes in production.

Because of this efficiency, I can run multiple Rust backends on a very small, inexpensive cloud infrastructure without breaking a sweat.

In fact, **this very website** (`portfolio-web`), along with my other apps running under the `trian.space` domain, are all running on top of **[Shipyard](/projects/shipyard)**.

Shipyard is my personal open-source project — a self-hosted Platform-as-a-Service (PaaS) that behaves like a private Vercel or Heroku. I built it completely on top of Rust. It communicates with Docker via WebSockets, automatically manages container deployments, handles SSL certificates, orchestrates Docker Swarms, and streams real-time deployment logs. Building Shipyard in Rust allowed me to construct a highly reliable, concurrent orchestration system that uses almost no system resources.

## Conclusion: A Shift in the Mental Model

At the end of the day, I love using Rust not because of the hype, and not because it's the popular language that everyone on the internet is talking about.

I use Rust because it fundamentally changes the way we think about writing code.

The concepts that Rust introduces aren't arbitrary rules meant to make your life harder. In fact, even if Rust had never been created, its mental model represents how we as programmers *should* be thinking about our code anyway. We should always be asking:
- Who owns this data?
- When is this memory allocated?
- How long does this reference need to exist?
- When can this resource be safely freed?

Java hides these questions behind the Garbage Collector, and C makes them dangerous. Rust brings them to the forefront, forces you to answer them at compile time, and rewards you with software that is both blazingly fast and rock-solid.

---

Thank you so much for taking the time to read my thoughts! If you want to discuss this post, share your own journey, or talk about Rust and Java, feel free to reach out. You can find all my details and contact form on my [contact](/contact) page. I'd love to hear your perspective!

