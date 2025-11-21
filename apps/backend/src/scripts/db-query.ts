import { AppDataSource } from '../config/typeorm-cli.config';
import { Todo } from '../todos/entities/todo.entity';

async function queryDatabase() {
  try {
    // Initialize the data source
    await AppDataSource.initialize();

    const todoRepository = AppDataSource.getRepository(Todo);

    // Get all todos
    const todos = await todoRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    console.log('\n=== All Todos ===');
    console.table(todos);

    // Get count
    const count = await todoRepository.count();
    console.log(`\nTotal todos: ${count}`);

    // Cleanup
    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Database query failed:', error);
    process.exit(1);
  }
}

queryDatabase();
