import type { ReactElement } from 'react';
import React from 'react';

import Song from '../Song';

interface SongsProps {
  songs: SpotifyApi.PlaylistTrackObject[];
}

export default React.memo(function Songs({ songs }: SongsProps): ReactElement {
  return (
    <div>
      <div className='flex flex-col px-8 pb-28 space-y-1 text-white'>
        {songs.map((song, i) => (
          <Song key={song.track.id} order={i} song={song} />
        ))}
      </div>
    </div>
  );
});
