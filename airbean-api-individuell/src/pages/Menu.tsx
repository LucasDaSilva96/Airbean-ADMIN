import { Card, CardContent } from '@/components/ui/card';
import { useQueryClient } from '@tanstack/react-query';
import MenuCard from '@/components/MenuCard';

type MenuItem = {
  created_at: string;
  desc: string;
  image: string;
  price: number;
  title: string;
  _id: string;
};

export default function Menu() {
  const queryClient = useQueryClient();
  const menu: MenuItem[] = queryClient.getQueryData(['menu'])!;

  return (
    <Card>
      <CardContent className='flex flex-col gap-4 py-4 px-2'>
        {menu && menu.map((item) => <MenuCard key={item._id} card={item} />)}
      </CardContent>
    </Card>
  );
}
