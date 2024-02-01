// Function to calculate hash value for a given string and a maximum limit
var hash = (string, max) => {
    var hashValue = 0;
    // Loop through each character in the string
    for (var i = 0; i < string.length; i++) {
      // Add the character code to the hash value
      hashValue += string.charCodeAt(i);
    }
    // Return the hash value modulo the given maximum limit
    return hashValue % max;
  };
  
  // HashTable constructor function
  let HashTable = function() {
    // Internal storage array
    let storage = [];
    // Maximum limit for the hash function
    const storageLimit = 14;
    
    // Method to print the current state of the hash table
    this.print = function() {
      console.log(storage);
    };
  
    // Method to add a key-value pair to the hash table
    this.add = function(key, value) {
      // Calculate the hash index for the given key
      var index = hash(key, storageLimit);
      // Check if the index in storage is undefined
      if (storage[index] === undefined) {
        // If undefined, create a new array at the index and add the key-value pair
        storage[index] = [
          [key, value]
        ];
      } else {
        // If the index is defined, check if the key already exists
        var inserted = false;
        for (var i = 0; i < storage[index].length; i++) {
          // If the key exists, update the value
          if (storage[index][i][0] === key) {
            storage[index][i][1] = value;
            inserted = true;
          }
        }
        // If the key doesn't exist, add a new key-value pair to the array
        if (inserted === false) {
          storage[index].push([key, value]);
        }
      }
    };
  
    // Method to remove a key-value pair from the hash table
    this.remove = function(key) {
      // Calculate the hash index for the given key
      var index = hash(key, storageLimit);
      // Check if the array at the index has only one element with the given key
      if (storage[index].length === 1 && storage[index][0][0] === key) {
        // If true, delete the entire array at the index
        delete storage[index];
      } else {
        // If there are multiple elements, loop through the array
        for (var i = 0; i < storage[index].length; i++) {
          // Find the element with the given key and delete it
          if (storage[index][i][0] === key) {
            delete storage[index][i];
          }
        }
      }
    };
  
    // Method to lookup and return the value for a given key
    this.lookup = function(key) {
      // Calculate the hash index for the given key
      var index = hash(key, storageLimit);
      // Check if the array at the index is undefined
      if (storage[index] === undefined) {
        // If true, return undefined
        return undefined;
      } else {
        // If the array is defined, loop through its elements
        for (var i = 0; i < storage[index].length; i++) {
          // Find the element with the given key and return its value
          if (storage[index][i][0] === key) {
            return storage[index][i][1];
          }
        }
      }
      // If key is not found, return undefined
      return undefined;
    };
  };
  
  // Example usage
  console.log(hash('quincy', 10)); // Output: 9
  let ht = new HashTable();
  ht.add('beau', 'person');
  ht.add('fido', 'dog');
  ht.add('rex', 'dinosaur');
  ht.add('tux', 'penguin');
  console.log(ht.lookup('tux')); // Output: penguin
  ht.print();
  