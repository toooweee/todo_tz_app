import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'mysql',
            host: 'db',
            port: 3306,
            username: 'root',
            password: 'asdfjkl',
            database: 'todo_db',
            synchronize: true,
            entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
          });
          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (err) {
          console.log('Error while initializing database database');
          throw err;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeormModule {}
