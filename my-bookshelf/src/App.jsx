import MemberCard from './components/MemberCard';
import BookCard from './components/BookCard';

const members = [
  {
    id:1,
    name: '田中 太郎',
    role: 'フロントエンド',
    message: 'Reactが楽しくなってきた。',
  },

  {
    id:2,
    name: '山田 花子',
    role: 'デザイナー',
    message: 'UIを整えるのが好きです。',
  },

  {
    id:3,
    name: '鈴木 一郎',
    role: 'バックエンド',
    message: 'APIを作っています。',
  }
]

const fruits = [
  { id: 1, name: "りんご", price: 120 },
  { id: 2, name: "みかん", price: 80 },
  { id: 3, name: "ぶどう", price: 300 },
];

const books = [
  {
    id: 1,
    title: '烏に単は似合わない',
    author: '阿部智里',
    rating: '☆4.2',
    comment: 'とても面白い本でした。全シリーズ買いました。'

  },

  {
    id: 2,
    title: '精霊の守り人',
    author: '上橋菜穂子',
    rating: '☆4.5',
    comment: '小学生の頃読んだ本です。'

  },

  {
    id: 3,
    title: '鼻',
    author: '芥川龍之介',
    rating: '☆4.0',
    comment: '小４くらいの時に読みました。記憶に残っています。'

  },

]


function App() {
  return (
    <main className="max-w-2xl mx-auto p-4 space-y-4">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          name={member.name}
          role={member.role}
          message={member.message}
        />
      ))}

      <ul>
      {fruits.map((fruit) => (
        <li key={fruit.id}>
          <h1>{fruit.name} - {fruit.price}円</h1>
        </li>
      ))}
      </ul>

      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          rating={book.rating}
          comment={book.comment}
        />
      ))} 
    </main>
  );
}

export default App;