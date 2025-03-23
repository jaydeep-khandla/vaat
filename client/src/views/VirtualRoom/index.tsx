import { useState } from 'react';
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  MonitorIcon,
  MoreHorizontalIcon,
  SendHorizontalIcon,
  MessagesSquareIcon,
  GridIcon,
  Maximize2Icon,
  Columns2Icon,
  PhoneIcon,
} from '@/components/icons';
import styles from './VirtualRoom.module.css';
import Button from '@/components/ui/Button';

type Layout = 'grid' | 'spotlight' | 'sideBySide';

interface Participant {
  id: string;
  name: string;
  audioEnabled: boolean;
  videoEnabled: boolean;
  imageUrl: string;
}

const participants: Participant[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    audioEnabled: true,
    videoEnabled: true,
    imageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    name: 'Michael Chen (You)',
    audioEnabled: true,
    videoEnabled: true,
    imageUrl:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    name: 'David Smith',
    audioEnabled: false,
    videoEnabled: true,
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    name: 'David Smith',
    audioEnabled: false,
    videoEnabled: true,
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '5',
    name: 'David Smith',
    audioEnabled: false,
    videoEnabled: true,
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '6',
    name: 'Sarah Johnson',
    audioEnabled: true,
    videoEnabled: true,
    imageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '7',
    name: 'Michael Chen (You)',
    audioEnabled: true,
    videoEnabled: true,
    imageUrl:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '8',
    name: 'David Smith',
    audioEnabled: false,
    videoEnabled: true,
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '9',
    name: 'David Smith',
    audioEnabled: false,
    videoEnabled: true,
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '10',
    name: 'David Smith',
    audioEnabled: false,
    videoEnabled: true,
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  },
];

interface Message {
  id: string;
  sender: string;
  senderImage: string;
  text: string;
  time: string;
}

const messages: Message[] = [
  {
    id: '1',
    sender: 'Sarah Johnson',
    senderImage:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    text: 'Hi everyone! Shall we start with the project updates?',
    time: '10:45 AM',
  },
  {
    id: '2',
    sender: 'David Smith',
    senderImage:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    text: "Yes, I've prepared the slides for my section.",
    time: '10:46 AM',
  },
];

export default function VirtualRoom() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [layout, setLayout] = useState<Layout>('grid');

  const handleLeaveMeeting = () => {
    // Implement leave meeting logic
    alert('Leaving meeting...');
  };

  return (
    <div
      className={`${styles.container} ${
        sidebarVisible ? styles.withSidebar : ''
      }`}
    >
      <div className={styles.mainContent}>
        {/* <div className={`${styles.videoGrid} ${styles[`${layout}Layout`]}`}>
          {renderParticipants()}
        </div> */}
        <VideoLayout participants={participants} layout={layout} />

        <div className={styles.controlBar}>
          <Button
            size="icon"
            className={`${styles.controlButton} ${
              audioEnabled ? styles.active : ''
            }`}
            onClick={() => setAudioEnabled(!audioEnabled)}
          >
            {audioEnabled ? (
              <MicIcon height={20} width={20} />
            ) : (
              <MicOffIcon height={20} width={20} />
            )}
          </Button>
          <Button
            size="icon"
            className={`${styles.controlButton} ${
              videoEnabled ? styles.active : ''
            }`}
            onClick={() => setVideoEnabled(!videoEnabled)}
          >
            {videoEnabled ? (
              <VideoIcon height={20} width={20} />
            ) : (
              <VideoOffIcon height={20} width={20} />
            )}
          </Button>
          <Button size="icon" className={styles.controlButton}>
            <MonitorIcon height={20} width={20} />
          </Button>
          <Button
            size="icon"
            className={`${styles.controlButton} ${
              sidebarVisible ? styles.active : ''
            }`}
            onClick={() => setSidebarVisible(!sidebarVisible)}
          >
            <MessagesSquareIcon height={20} width={20} />
          </Button>
          <Button
            size="icon"
            className={`${styles.controlButton} ${
              showMoreOptions ? styles.active : ''
            }`}
            onClick={() => setShowMoreOptions(!showMoreOptions)}
          >
            <MoreHorizontalIcon height={20} width={20} />
          </Button>
          <Button
            size="icon"
            className={`${styles.controlButton} ${styles.danger}`}
            onClick={handleLeaveMeeting}
          >
            <PhoneIcon height={20} width={20} />
          </Button>

          {showMoreOptions && (
            <div className={styles.moreOptionsMenu}>
              <Button
                className={`${styles.menuItem} ${
                  layout === 'grid' ? styles.active : ''
                }`}
                onClick={() => setLayout('grid')}
              >
                <GridIcon height={16} width={16} />
                Grid View
              </Button>
              <Button
                className={`${styles.menuItem} ${
                  layout === 'spotlight' ? styles.active : ''
                }`}
                onClick={() => setLayout('spotlight')}
              >
                <Maximize2Icon height={16} width={16} />
                Spotlight View
              </Button>
              <Button
                className={`${styles.menuItem} ${
                  layout === 'sideBySide' ? styles.active : ''
                }`}
                onClick={() => setLayout('sideBySide')}
              >
                <Columns2Icon height={16} width={16} />
                Side by Side
              </Button>
            </div>
          )}
        </div>
      </div>
      <Sidebar sidebarVisible={sidebarVisible} />
    </div>
  );
}

function Sidebar({ sidebarVisible }: { sidebarVisible: boolean }) {
  const [activeTab, setActiveTab] = useState<'chat' | 'participants'>('chat');
  const [messageInput, setMessageInput] = useState('');

  return (
    <div
      className={`${styles.sidebar} ${
        sidebarVisible ? styles.sidebarVisible : ''
      }`}
    >
      <div className={styles.tabHeader}>
        <Button
          size="icon"
          className={`${styles.tab} ${
            activeTab === 'chat' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </Button>
        <Button
          size="icon"
          className={`${styles.tab} ${
            activeTab === 'participants' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('participants')}
        >
          Participants
        </Button>
      </div>

      {activeTab === 'chat' && (
        <div className={styles.chatContainer}>
          <div className={styles.messageList}>
            {messages.map((message) => (
              <div key={message.id} className={styles.message}>
                <img
                  src={message.senderImage}
                  alt={message.sender}
                  className={styles.messageAvatar}
                />
                <div className={styles.messageContent}>
                  <div className={styles.messageHeader}>
                    <strong>{message.sender}</strong>
                    <span className={styles.messageTime}>{message.time}</span>
                  </div>
                  <div>{message.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.messageInput}>
            <input
              type="text"
              className={styles.input}
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <Button className={styles.sendButton}>
              <SendHorizontalIcon height={20} width={20} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function VideoLayout({
  participants,
  layout,
}: {
  participants: Participant[];
  layout: string;
}) {
  const renderParticipants = () => {
    if (layout === 'spotlight') {
      const [mainParticipant, ...others] = participants;
      return (
        <>
          <div className={styles.participantContainer}>
            <img
              src={mainParticipant.imageUrl}
              alt={mainParticipant.name}
              className={styles.participantVideo}
            />
            <div className={styles.participantInfo}>
              <span className={styles.participantName}>
                {mainParticipant.name}
              </span>
              <div
                className={`${styles.audioIndicator} ${
                  mainParticipant.audioEnabled
                    ? styles.audioActive
                    : styles.audioMuted
                }`}
              />
            </div>
          </div>
          <div className={styles.otherParticipants}>
            {others.map((participant) => (
              <div key={participant.id} className={styles.participantContainer}>
                <img
                  src={participant.imageUrl}
                  alt={participant.name}
                  className={styles.participantVideo}
                />
                <div className={styles.participantInfo}>
                  <span className={styles.participantName}>
                    {participant.name}
                  </span>
                  <div
                    className={`${styles.audioIndicator} ${
                      participant.audioEnabled
                        ? styles.audioActive
                        : styles.audioMuted
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }

    if (layout === 'sideBySide') {
      const [mainParticipant, ...others] = participants;
      return (
        <>
          <div className={styles.mainVideo}>
            <div className={styles.participantContainer}>
              <img
                src={mainParticipant.imageUrl}
                alt={mainParticipant.name}
                className={styles.participantVideo}
              />
              <div className={styles.participantInfo}>
                <span className={styles.participantName}>
                  {mainParticipant.name}
                </span>
                <div
                  className={`${styles.audioIndicator} ${
                    mainParticipant.audioEnabled
                      ? styles.audioActive
                      : styles.audioMuted
                  }`}
                />
              </div>
            </div>
          </div>
          <div className={styles.sideContent}>
            {others.map((participant) => (
              <div key={participant.id} className={styles.participantContainer}>
                <img
                  src={participant.imageUrl}
                  alt={participant.name}
                  className={styles.participantVideo}
                />
                <div className={styles.participantInfo}>
                  <span className={styles.participantName}>
                    {participant.name}
                  </span>
                  <div
                    className={`${styles.audioIndicator} ${
                      participant.audioEnabled
                        ? styles.audioActive
                        : styles.audioMuted
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }

    return participants.map((participant) => (
      <div key={participant.id} className={styles.participantContainer}>
        <img
          src={participant.imageUrl}
          alt={participant.name}
          className={styles.participantVideo}
        />
        <div className={styles.participantInfo}>
          <span className={styles.participantName}>{participant.name}</span>
          <div
            className={`${styles.audioIndicator} ${
              participant.audioEnabled ? styles.audioActive : styles.audioMuted
            }`}
          />
        </div>
      </div>
    ));
  };

  return (
    <div className={`${styles.videoGrid} ${styles[`${layout}Layout`]}`}>
      {renderParticipants()}
    </div>
  );
}
