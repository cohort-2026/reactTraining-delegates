// Lab 2.2: Fetch and Display Data from a Public API
// Run with: node lab2-2.js
// Node has fetch built in, so nothing needs installing.

const API = "https://jsonplaceholder.typicode.com";

// TODO (step 2): make this an async function so you can use await inside it.
async function loadTodos(limit) {
  // TODO (step 5): wrap the code below in try / catch / finally.
  //   catch:   log a friendly message with err.message (no crash)
  //   finally: log "Done loading"

  let result;
  try {
    // TODO (step 3): fetch `${API}/todos?_limit=10`, using limit in place of the 10.
    result = await fetch(`${API}/todoz?_limit=${limit}`);
  } catch (err){
    console.log("Sorry, an error occured: ", err.message);
  } finally {
    console.log("Done loading.");

    // TODO (step 4): if res.ok is false, throw a new Error that includes res.status.
    if(!result.ok){
      console.log("Sorry, an error occured:", result.status);
      return;
    }
  }


  // TODO: parse the body with res.json() (it needs its own await).
  let parsedResult = await result.json();

  // TODO (step 6): log a numbered list of titles with a [done] or [open] marker,
  // using each to-do's completed and title properties, for example:
  //   1. [open] delectus aut autem
  // Hint: map gives you the index as the second callback argument.
  parsedResult.map(p => {
    console.log(`#${p.id} ${p.title} ${p.completed? "[done]":"[open]"}`);
  });

  // TODO (step 7): use filter to count the completed to-dos and log
  //   Completed: 3 of 10
  const completed = parsedResult.filter(p => p.completed === true);
  console.log(`Completed: ${completed.length} of ${parsedResult.length}`);
}

loadTodos(10);

// TODO (step 8): test the error path by changing todos to todoz in the URL.
// You should see your friendly error and "Done loading", not a crash.
// Change it back before you commit.
