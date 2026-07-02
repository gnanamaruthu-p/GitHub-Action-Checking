// ======================================
// JavaScript Array Methods for SDET / Playwright Practice
// ======================================

// 1. Create an array of 10 test cases

const testCases = [
  { id: 1, name: "Login Test", priority: "high" },
  { id: 2, name: "Logout Test", priority: "medium" },
  { id: 3, name: "Add To Cart Test", priority: "high" },
  { id: 4, name: "Remove From Cart Test", priority: "medium" },
  { id: 5, name: "Checkout Test", priority: "high" },
  { id: 6, name: "Search Product Test", priority: "low" },
  { id: 7, name: "Apply Coupon Test", priority: "medium" },
  { id: 8, name: "Payment Test", priority: "high" },
  { id: 9, name: "Profile Update Test", priority: "low" },
  { id: 10, name: "Password Reset Test", priority: "high" }
];

console.log("=================================");
console.log("1. forEach - Print all test cases");
console.log("=================================");

// 2. Use forEach to print each test case

testCases.forEach(testCase => {
  console.log(
    `ID: ${testCase.id} | Name: ${testCase.name} | Priority: ${testCase.priority}`
  );
});


// =================================
// Array Method 1: filter()
// Get all high priority tests
// =================================

console.log("\n2. filter() - High Priority Tests");

const highPriorityTests = testCases.filter(
  testCase => testCase.priority === "high"
);

console.log(highPriorityTests);


// =================================
// Array Method 2: map()
// Get only test names
// =================================

console.log("\n3. map() - Test Names");

const testNames = testCases.map(
  testCase => testCase.name
);

console.log(testNames);


// =================================
// Array Method 3: find()
// Find a specific test case
// =================================

console.log("\n4. find() - Find Checkout Test");

const checkoutTest = testCases.find(
  testCase => testCase.name === "Checkout Test"
);

console.log(checkoutTest);


// =================================
// Array Method 4: some()
// Check if low priority tests exist
// =================================

console.log("\n5. some() - Check Low Priority Tests");

const hasLowPriority = testCases.some(
  testCase => testCase.priority === "low"
);

console.log(hasLowPriority);


// =================================
// Array Method 5: sort()
// Sort test cases by ID descending
// =================================

console.log("\n6. sort() - Sort By ID Descending");

const sortedTests = [...testCases].sort(
  (a, b) => b.id - a.id
);

console.log(sortedTests);