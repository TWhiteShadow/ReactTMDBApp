const DB_NAME = "MovieDB";
const STORE_NAME = "favorites";
const RATING_STORE = "ratings";
const COMMENT_STORE = "comments";
const DB_VERSION = 3;

// Open IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(RATING_STORE)) {
        db.createObjectStore(RATING_STORE, { keyPath: "movieId" });
      }
      if (!db.objectStoreNames.contains(COMMENT_STORE)) {
        const store = db.createObjectStore(COMMENT_STORE, { keyPath: "id", autoIncrement: true });
        store.createIndex("movieId", "movieId", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Save rating
export const saveRating = async (movieId, rating) => {
  const db = await openDB();
  const tx = db.transaction(RATING_STORE, "readwrite");
  const store = tx.objectStore(RATING_STORE);
  store.put({ movieId, rating });
  return tx.complete;
};

// Get rating
export const getRating = async (movieId) => {
  const db = await openDB();
  const tx = db.transaction(RATING_STORE, "readonly");
  const store = tx.objectStore(RATING_STORE);
  return new Promise((resolve) => {
    const request = store.get(movieId);
    request.onsuccess = () => resolve(request.result?.rating || 0);
    request.onerror = () => resolve(0);
  });
};

// Save a new comment
export const saveComment = async (movieId, text) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(COMMENT_STORE, "readwrite");
      const store = tx.objectStore(COMMENT_STORE);
      const comment = { movieId, text, timestamp: Date.now() };
      const request = store.add(comment);
      
      request.onsuccess = () => resolve(comment);
      request.onerror = () => reject("Failed to save comment");
    });
  };
  
  export const getComments = async (movieId) => {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(COMMENT_STORE, "readonly");
      const store = tx.objectStore(COMMENT_STORE);
      const index = store.index("movieId");
      const comments = [];
      const request = index.openCursor(IDBKeyRange.only(movieId), "prev"); // Get newest first
  
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor && comments.length < 5) {
          comments.push(cursor.value);
          cursor.continue();
        } else {
          resolve(comments);
        }
      };
  
      request.onerror = () => resolve([]);
    });
  };
  

// Add movie to favorites
export const addFavorite = async (movie) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.put(movie);
  return tx.complete;
};

// Remove movie from favorites
export const removeFavorite = async (id) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.delete(id);
  return tx.complete;
};

// Check if a movie is in favorites
export const isFavorite = async (id) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return new Promise((resolve) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(!!request.result);
    request.onerror = () => resolve(false);
  });
};

// Get all favorite movies
export const getFavorites = async () => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return new Promise((resolve) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve([]);
  });
};
