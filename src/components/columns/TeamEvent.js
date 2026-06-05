// @flow

import * as React from 'react';
import TickIcon from '../icon/TickIcon';

type Props = {
  race: {
    teamEvent: boolean,
  }
};

export default function TeamEvent({ race }: Props) {
  return (
    <td>
      <div>
        {race.teamEvent && <TickIcon />}
      </div>
    </td>
  );
}
