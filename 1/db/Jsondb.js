import fs from "fs";

export class JsonDB {
  constructor(filePath) {
    this.filePath = filePath;

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(
        filePath,
        JSON.stringify({ lastId: 0, data: [] }, null, 2)
      );
    }
  }

  _read() {
    return JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
  }

  _write(db) {
    fs.writeFileSync(this.filePath, JSON.stringify(db, null, 2));
  }

  // CREATE
  insert(item) {
    const db = this._read();

    const newId = db.lastId + 1;

    const newItem = {
      id: newId,
      ...item,
      createdAt: new Date().toISOString(),
    };

    db.data.push(newItem);
    db.lastId = newId;

    this._write(db);
    return newItem;
  }

  // READ ALL
  findAll() {
    return this._read().data;
  }

  // FIND BY ID
  findById(id) {
    const db = this._read();
    return db.data.find((item) => item.id === id) || null;
  }

  // FIND BY FILTER
  findBy(filterFn) {
    const db = this._read();
    return db.data.filter(filterFn);
  }

  // UPDATE
  update(id, updates) {
    const db = this._read();

    const index = db.data.findIndex((item) => item.id === id);
    if (index === -1) return null;

    db.data[index] = {
      ...db.data[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this._write(db);
    return db.data[index];
  }

  // DELETE
  delete(id) {
    const db = this._read();

    const newData = db.data.filter((item) => item.id !== id);

    if (newData.length === db.data.length) return false;

    db.data = newData;
    this._write(db);

    return true;
  }
}