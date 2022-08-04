declare global {
  var mongoose: {
    conn: any;
    promise: any;
  }; // 👈️ disables type checking for property
}

export {};