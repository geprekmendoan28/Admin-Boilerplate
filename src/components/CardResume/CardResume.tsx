import React from 'react';
import { Card, Statistic } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
function CardResume() {
  return (
    <div>
      <Card className="parent-cardres">
        <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
      </Card>
    </div>
  );
}
export default CardResume;
