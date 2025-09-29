import { Card, Group, Badge, ActionIcon, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

// Helper to map categories to colors
const getCategoryColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'food':
      return 'teal';
    case 'transport':
      return 'blue';
    case 'entertainment':
      return 'pink';
    case 'housing':
      return 'indigo'; // อาจจะไม่ได้ใช้ แต่มีไว้เผื่ออนาคต
    case 'utilities':
      return 'orange'; // อาจจะไม่ได้ใช้ แต่มีไว้เผื่ออนาคต
    default:
      return 'gray';
  }
};

type ExpenseProps = {
  id: string; 
  name: string;
  amount: number | string;
  category: string;
  onDelete: () => void;
};

export default function ItemCard({
  name,
  amount,
  category,
  onDelete,
}: ExpenseProps) {
  const displayAmount = Number(amount);
  
  // Prepare display values
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const badgeColor = getCategoryColor(category);

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      style={{ width: '100%' }}
    >
      <Group position="apart" align="center">
        
        {/* Left Side: Name and Category */}
        <Group spacing="sm">
          <Text weight={500}>{name}</Text>
          <Badge color={badgeColor} variant="light">
            {formattedCategory}
          </Badge>
        </Group>

        {/* Right Side: Amount and Delete Button */}
        <Group spacing="md" align="center">
          <Text size="lg" weight={700} color="red">
            {displayAmount.toFixed(2)} Baht
          </Text>
          
          <ActionIcon 
            variant="light" 
            color="red" 
            size="lg" 
            onClick={onDelete}
            title="Delete expense"
          >
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}