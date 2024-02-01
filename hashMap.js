// Factory function to create a HashMap
const HashMapFactory = (initialCapacity = 16) => {
    let capacity = initialCapacity;
    let buckets = new Array(capacity).fill(null);
    let size = 0;
    const loadFactor = 0.75;
  
    // Hash function for strings
    const hash = (key) => {
      let hashCode = 0;
      const primeNumber = 31;
  
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
      }
  
      return hashCode % capacity;
    };
  
    // Method to resize the hash map
    const resize = (newCapacity) => {
      const newBuckets = new Array(newCapacity).fill(null);
      capacity = newCapacity;
  
      buckets.forEach((bucket) => {
        if (bucket) {
          bucket.forEach(({ key, value }) => {
            const index = hash(key);
            if (!newBuckets[index]) {
              newBuckets[index] = [];
            }
            newBuckets[index].push({ key, value });
            size++;
          });
        }
      });
  
      buckets = newBuckets;
    };
  
    return {
      // Method to set key-value pair in the hash map
      set(key, value) {
        const index = hash(key);
  
        if (!buckets[index]) {
          buckets[index] = [];
        }
  
        const entry = buckets[index].find((entry) => entry.key === key);
  
        if (entry) {
          entry.value = value;
        } else {
          buckets[index].push({ key, value });
          size++;
        }
  
        // Check if resizing is needed after insertion
        if (size / capacity > loadFactor) {
          // Double the capacity and resize the hash map
          resize(capacity * 2);
        }
      },
  
      // Method to get the value associated with a key
      get(key) {
        const index = hash(key);
  
        if (!buckets[index]) {
          return null;
        }
  
        const entry = buckets[index].find((entry) => entry.key === key);
  
        return entry ? entry.value : null;
      },
  
      // Method to check if a key is present in the hash map
      has(key) {
        const index = hash(key);
  
        return !!buckets[index] && buckets[index].some((entry) => entry.key === key);
      },
  
      // Method to remove a key and its associated value from the hash map
      remove(key) {
        const index = hash(key);
  
        if (!buckets[index]) {
          return false;
        }
  
        const entryIndex = buckets[index].findIndex((entry) => entry.key === key);
  
        if (entryIndex !== -1) {
          buckets[index].splice(entryIndex, 1);
          size--;
  
          // Check if resizing is needed after removal
          if (size / capacity < loadFactor / 4) {
            // Halve the capacity and resize the hash map
            resize(Math.max(capacity / 2, 1));
          }
  
          return true;
        } else {
          return false;
        }
      },
  
      // Method to return the number of stored keys in the hash map
      length() {
        return size;
      },
  
      // Method to remove all entries in the hash map
      clear() {
        buckets = new Array(capacity).fill(null);
        size = 0;
      },
  
      // Method to return an array containing all the keys in the hash map
      keys() {
        const keysArray = [];
  
        buckets.forEach((bucket) => {
          if (bucket) {
            bucket.forEach((entry) => {
              keysArray.push(entry.key);
            });
          }
        });
  
        return keysArray;
      },
  
      // Method to return an array containing all the values in the hash map
      values() {
        const valuesArray = [];
  
        buckets.forEach((bucket) => {
          if (bucket) {
            bucket.forEach((entry) => {
              valuesArray.push(entry.value);
            });
          }
        });
  
        return valuesArray;
      },
  
      // Method to return an array containing all key-value pairs in the hash map
      entries() {
        const entriesArray = [];
  
        buckets.forEach((bucket) => {
          if (bucket) {
            bucket.forEach((entry) => {
              entriesArray.push([entry.key, entry.value]);
            });
          }
        });
  
        return entriesArray;
      },
    };
  };
  
  // Extra Credit: HashSet class (only contains keys with no values)
  const HashSetFactory = (initialCapacity = 16) => {
    const hashMap = HashMapFactory(initialCapacity);
  
    return {
      add(key) {
        // Add key with a placeholder value (e.g., true)
        hashMap.set(key, true);
      },
  
      has(key) {
        return hashMap.has(key);
      },
  
      remove(key) {
        return hashMap.remove(key);
      },
  
      length() {
        return hashMap.length();
      },
  
      clear() {
        hashMap.clear();
      },
  
      keys() {
        return hashMap.keys();
      },
    };
  };
  
  // Example usage of HashMap and HashSet
  const myHashMap = HashMapFactory();
  myHashMap.set('name', 'John');
  myHashMap.set('age', 25);
  myHashMap.set('location', 'City');
  
  console.log(myHashMap.get('age')); // Output: 25
  console.log(myHashMap.has('gender')); // Output: false
  
  const myHashSet = HashSetFactory();
  myHashSet.add('apple');
  myHashSet.add('banana');
  myHashSet.add('orange');
  
  console.log(myHashSet.has('banana')); // Output: true
  console.log(myHashSet.length()); // Output: 3
  
