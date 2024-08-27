const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// CORSとbody-parserのミドルウェアを設定
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());


// MongoDBとの接続
const dbURI = "mongodb://localhost:27017/kouki";  // ここを適切な接続文字列に置き換えてください
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log("Connected successfully to MongoDB");
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, required: true }
});

// モデルの作成
const User = mongoose.model('User', userSchema);

// ルート定義
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// すべてのユーザーを取得
app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(users);
    }
  });
});

// 新しいユーザーを作成
app.post('/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(user);
    }
  });
});

// ユーザー情報の更新
app.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(user);
    }
  });
});

// ユーザーの削除
app.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send('User deleted');
    }
  });
});

// JSONファイルを読み込んでデータベースに保存
app.post('/users/batch', (req, res) => {
  fs.readFile('jsondata2.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Failed to read file", err);
      res.status(500).send("Failed to read file");
      return;
    }
    const users = JSON.parse(data);
    User.insertMany(users)
      .then(docs => {
        console.log("Data inserted successfully:", docs);
        res.status(201).json(docs);
      })
      .catch(err => {
        console.error("Error inserting data", err);
        res.status(500).send(err);
      }); 
  });
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-transform-private-property-in-object"
  ]
};

console.log(__dirname); // 現在のディレクトリパスを表示

fs.access('jsondata2.json', fs.constants.F_OK, (err) => {
  console.log(`${err ? 'ファイルが見つかりません' : 'ファイルが存在します'}`);
});
