import type { ReactElement } from 'react';
import React from 'react';

import Song from '../Song';

interface SongsProps {
  songs: SpotifyApi.PlaylistTrackObject[];
}

export default React.memo(function Songs({ songs }: SongsProps): ReactElement {
  return (
    <div>
      <div className='text-white'>
        {songs.map((song) => (
          <Song key={song.track.id} song={song} />
        ))}
      </div>
    </div>
  );
});
