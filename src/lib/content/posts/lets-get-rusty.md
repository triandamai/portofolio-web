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

Java is the language that formed my entire mental model of what programming is supposed to be. Code should be structured. Things should have clear responsibilities. Architecture matters. From the moment I understood that, I couldn't un-know it.

I've been writing Java ever since, in one form or another.

## But no system is perfect

Java is great. Java is also heavy.

Give Java 8GB of RAM and it will find a way to use all of it. The JVM startup time, the memory overhead, the verbosity of certain patterns — these are real costs. You trade performance and resource efficiency for developer productivity and ecosystem maturity. That's a valid trade in a lot of contexts, but it's still a trade.

![Java eating all your RAM](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuuFof6n24fdtlHURawv4KSmu__Ju5x1Me_L_aNvdPz_UpJO9dOj1OkCxY&s=10)

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

**Ownership** started to make sense once I stopped fighting it and started thinking in terms of who is responsible for a piece of data and when.

**Lifetimes** — which look terrifying when you first see the `'a` syntax — turned out to be the compiler's way of asking: *how long does this reference actually need to be valid?* Once I framed it that way, it wasn't magic, it was just explicit logic.

**Traits** felt familiar after years of Java interfaces, but more composable, more precise. You're not inheriting a hierarchy — you're describing capabilities.

**Macros** were the part that still surprises me. The `macro_rules!` system and procedural macros let Rust extend itself in ways that feel almost like a different language living inside the language. Strange and powerful.

---

*Still going — next I want to write about what it actually feels like to build something real in Rust, where the language gets out of your way and where it doesn't, and whether I think it's worth recommending to someone who, like me, started with Java.*
