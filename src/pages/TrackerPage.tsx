import { useState } from "react";
import { Button, Stack, Title, Divider, Container, Group, Text } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

// 🚨 สำคัญ: การนำเข้าถูกแก้ไขเพื่อให้ตรงกับโครงสร้างไฟล์
import AddExpenseModal from "../components/Modal"; 
import ItemCard from "../components/ItemCard";

type Expense = {
  id: string;
  name: string;
  amount: number;
  category: string;
};

// 🚨 แก้ไข: ปรับ ALL_CATEGORIES ให้ตรงกับ Modal (ต้องเป็นตัวพิมพ์เล็กทั้งหมด)
const ALL_CATEGORIES = ["food", "transport", "entertainment"]; 

export default function ExpenseTracker() {
  const [opened, setOpened] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // 1. Function to add a new expense
  const handleAddExpense = (
    name: string,
    amount: number,
    category: string
  ) => {
    const newExpense: Expense = {
      id: uuidv4(),
      name,
      amount,
      category: category.toLowerCase(),
    };
    
    setExpenses((prev) => [newExpense, ...prev]);
  };

  // 2. Function to delete an expense by ID
  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  // 3. Calculate Total Cost
  const totalCost = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // 4. Calculate Category Costs Breakdown
  const categoryTotals = expenses.reduce((acc, expense) => {
    const cat = expense.category;
    acc[cat] = (acc[cat] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);


  return (
    <Container style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      
      {/* Header and Add Button */}
      <Group position="apart" mb="md">
        <Title order={2}>
          Expense Tracker
        </Title>
        <Button onClick={() => setOpened(true)}>
          + Add Expense Item
        </Button>
      </Group>

      {/* The Modal */}
      <AddExpenseModal
        opened={opened}
        onClose={() => setOpened(false)}
        onAdd={handleAddExpense}
      />

      <Divider my="md" />
      
      {/* Total Cost Summary */}
      <Title order={4}>Total cost: {totalCost.toFixed(2)} Baht</Title>
      
      {/* Category Breakdown */}
      <Stack my="sm" spacing={5}>
        {/* แสดงผลแค่ 3 หมวดหมู่ที่ถูกกำหนดไว้ */}
        {ALL_CATEGORIES.map((cat) => (
          <Text size="sm" key={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}: 
            <Text component="span" weight={500}> {categoryTotals[cat]?.toFixed(2) || '0.00'} Baht</Text>
          </Text>
        ))}
      </Stack>

      <Divider my="md" />
      
      {/* Expense Card List */}
      <Title order={3} mb="sm">Recent Expenses</Title>
      <Stack>
        {expenses.length === 0 ? (
          <Text color="dimmed" align="center">No expenses added yet.</Text>
        ) : (
          expenses.map((expense) => (
            <ItemCard 
              key={expense.id}
              id={expense.id}
              name={expense.name}
              amount={expense.amount}
              category={expense.category}
              onDelete={() => handleDeleteExpense(expense.id)} 
            />
          ))
        )}
      </Stack>
    </Container>
  );
}