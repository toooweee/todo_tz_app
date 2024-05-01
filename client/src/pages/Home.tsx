import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="mt-10 p-5 rounded-md bg-emerald-50 shadow-md">
      <h1 className="text-2xl text-neutral-500">Добро пожаловать!</h1>
      <p className="text-lg text-neutral-700 mt-4">
        Приветствуем вас на нашем сайте! Здесь вы можете создавать и управлять
        своими задачами, а также просматривать задачи всех пользователей, чтобы
        все было не конфедициально!) Зато вы можете их только смотреть и
        завидовать, ведь никакие действия с их тасками недоступны.
      </p>
      <p className="text-lg text-neutral-700 mt-4">
        Наш сервис предоставляет простой и удобный интерфейс для организации
        вашего рабочего процесса.
      </p>
    </div>
  );
};

export default Home;
