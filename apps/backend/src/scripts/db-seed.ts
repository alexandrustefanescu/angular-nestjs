import { AppDataSource } from '../config/typeorm-cli.config';
import { Todo } from '../todos/entities/todo.entity';

async function seedDatabase() {
  try {
    await AppDataSource.initialize();

    const todoRepository = AppDataSource.getRepository(Todo);

    const count = await todoRepository.count();
    if (count > 0) {
      console.log(`Database already has ${count} todos. Skipping seed.`);
      await AppDataSource.destroy();
      process.exit(0);
    }

    // Sample data
    const sampleTodos = [
      {
        title: 'Learn TypeORM',
        isCompleted: false,
      },
      {
        title: 'Build REST API',
        isCompleted: false,
      },
      {
        title: 'Write tests',
        isCompleted: false,
      },
      {
        title: 'Deploy to production',
        isCompleted: false,
      },
    ];

    // Insert data
    await todoRepository.insert(sampleTodos);

    console.log(`✓ Seeded ${sampleTodos.length} todos`);

    // Show inserted data
    const todos = await todoRepository.find();
    console.log('\nInserted todos:');
    console.table(todos);

    // Cleanup
    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Database seed failed:', error);
    process.exit(1);
  }
}

void seedDatabase();
