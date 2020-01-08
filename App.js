import React from 'react';
import {FlatList, StatusBar, StyleSheet} from 'react-native';

import YouTube from 'react-native-youtube';
import CategoryComponent from './components/CategoryComponents';

class App extends React.Component {
  state = {
    currentChannel: 0,
    currentVideo: 0,
  };

  channels = [
    {
      id: 1,
      name: 'Meme Radar',
      icon:
        'https://neverthink.tv/assets/images/63e3939725b3d92af5e7b8429a0f4d57e6be661abf380b39348f360e528dd6e2.png',
      playlist: [
        'QSqIG5Dl-SM',
        'jM0GePXOdT0',
        'exLTGu_c5fs',
        'Km8kIX-8hVs',
        'c9EOCt9kkUo',
        '-goTfMUabxc',
        'y7pZzp99Jgs',
        '85RhW75xM8U',
        'URLyBDYHoGo',
      ],
    },
    {
      id: 2,
      name: 'LOL',
      icon:
        'https://neverthink.tv/assets/images/61d1aeee19fd7cff13a8b17727f1b5a4e9645f16c42ff376a5e5f3ce8a373df2.png',
      playlist: [
        '_Czxy3nya8Y',
        'p8UR4dODogI',
        'HoL1csZPYsk',
        '8V0HETilr4I',
        'ADrBo7u3tR4',
        'BgZh5T4nG_w',
        'J3iSEq5Apfg',
        'iCc5l8iWUZs',
      ],
    },
    {
      id: 3,
      name: 'WTF',
      icon:
        'https://neverthink.tv/assets/images/fde01ee47dc02d83892c35c22f2efd81f52c37edc4f3651be40094a115c812fd.png',
      playlist: ['JZnlJ2upJv8', 'Km8kIX-8hVs', 'tHa260XXH6U'],
    },
  ];

  /* Data example
                {
                  channelIndex: indexLastVideoSeen (for each channel),
                  0: 2,
                  2: 1
                }
              */

  videosSeen = {0: 0};

  selectChannel = newChannel => {
    const newChannelIndex = this.channels.findIndex(
      channel => channel.id === newChannel.id,
    );

    if (newChannelIndex === this.state.currentChannel) {
      return;
    }

    // Check the last video seen in the new channel
    if (this.videosSeen[newChannelIndex] === null) {
      /*  is the first time watching this channel
                            I start the playlist for the first video
                        */
      this.setState({currentVideo: 0, currentChannel: newChannelIndex});
      this.videosSeen[newChannelIndex] = 0;
    } else {
      /*  I watched this channel before... I have to get the last video that I watched (the index of the video)
                and check if it was the last video of the playlist if is it I have to play the first video else
                I have to play the next video of the playlist
            */
      const maxVideos = this.channels[newChannelIndex].playlist.length - 1;
      const lastVideoSeen = this.videosSeen[newChannelIndex];
      let newVideo = 0;
      if (lastVideoSeen < maxVideos) {
        newVideo = lastVideoSeen + 1;
      }

      this.setState({currentVideo: newVideo, currentChannel: newChannelIndex});
      this.videosSeen[newChannelIndex] = newVideo;
    }
  };

  videoChangeState = state => {
    if (state.state === 'ended') {
      if (
        this.state.currentVideo <
        this.channels[this.state.currentChannel].playlist.length - 1
      ) {
        const newVideo = this.state.currentVideo + 1;
        this.setState({currentVideo: newVideo});
        this.videosSeen[this.state.currentChannel] = newVideo;
      } else {
        this.setState({currentVideo: 0});
        this.videosSeen[this.state.currentChannel] = this.state.currentVideo;
      }
    }
  };

  getCurrentChannelId = () => {
    return this.channels[this.state.currentChannel].id;
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <YouTube
          videoId={
            this.channels[this.state.currentChannel].playlist[
              this.state.currentVideo
            ]
          } // The YouTube video ID
          play={true} // control playback of video with true/false
          fullscreen={false} // control whether the video should play in fullscreen or inline
          loop={false} // control whether the video should loop when ended
          // onReady={e => this.setState({isReady: true})}
          onChangeState={this.videoChangeState}
          // onChangeQuality={e => this.setState({quality: e.quality})}
          // onError={e => this.setState({error: e.error})}
          style={styles.youtube}
          apiKey={'AIzaSyB3FYCV9wt0eU4Ih6KzMtES-KMz82i1Kzw'}
        />

        <FlatList
          data={this.channels}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <CategoryComponent
              category={item}
              index={index}
              currentChannelId={this.getCurrentChannelId()}
              onRowSelected={this.selectChannel}
            />
          )}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  youtube: {
    alignSelf: 'stretch',
    height: '50%',
  },
});

export default App;
