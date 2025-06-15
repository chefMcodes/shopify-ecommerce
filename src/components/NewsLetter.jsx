import { Button, Input, Space } from 'antd';
const { Search } = Input;

export default function NewsLetter() {
  return (
    <div className="px-4 lg:px-20 flex flex-col md:flex-row justify-between items-start md:items-center bg-[#f6f6f6] py-10 gap-4">
      {/* Text Section */}
      <div className="md:w-1/2">
        <h1 className="font-bold text-2xl mb-1">Join Our Newsletter</h1>
        <p className="font-light">
          We love to surprise our subscribers with occasional gifts.
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full md:w-1/2">
        <Space.Compact className="w-full">
          <Input placeholder="Your email address" className="w-full" />
          <Button type="primary" className="!bg-[#0E1422]">
            Subscribe
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
}
