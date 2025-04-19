import { FaTrashCan } from 'react-icons/fa6';

import { Button } from '../Button/Button';

export default function SalonCard({ salon, removeSalonHandler }: { removeSalonHandler: (salon: string) => void; salon: string }) {
  return (
    <div className="flex gap-4 h-[30px]  bg-blue-300 justify-between items-center">
      <p className="text-[12px] font-semibold w-max flex items-center">{salon}</p>
      <Button $width="30px" $tiny $color="white" onClick={() => removeSalonHandler(salon)}>
        <FaTrashCan color="red" fontSize="14px"></FaTrashCan>
      </Button>
    </div>
  );
}
