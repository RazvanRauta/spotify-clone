import type { ReactElement } from 'react';
import React from 'react';

interface SongProps {
  song: SpotifyApi.PlaylistTrackObject;
}

export default React.memo(function Song({ song }: SongProps): ReactElement {
  return <div>{song.track.name}</div>;
});
