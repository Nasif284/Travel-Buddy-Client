import {
  sendCallAnswer,
  sendCallIceCandidate,
  sendCallOffer,
} from "@/src/socket/call/call.socket";

import type { CallMediaType } from "@/src/store/call.store";

export class WebRTCManager {
  private peer: RTCPeerConnection | null = null;

  private localStream: MediaStream | null =
    null;

  constructor(
    private readonly callId: string,
    private readonly remoteUserId: string,
    private readonly onRemoteStream: (
      stream: MediaStream,
    ) => void,
    private readonly onConnected: () => void,
  ) {
    this.createPeerConnection();
  }

  private createPeerConnection() {
    this.peer =
      new RTCPeerConnection({
        iceServers: [
          {
            urls:
              "stun:stun.l.google.com:19302",
          },
        ],
      });


    this.peer.onicecandidate = (
      event,
    ) => {
      if (!event.candidate) {
        return;
      }

      sendCallIceCandidate(
        this.callId,
        this.remoteUserId,
        event.candidate.toJSON(),
      );
    };


    this.peer.ontrack = (event) => {
      const [stream] =
        event.streams;

      if (!stream) {
        return;
      }

      console.log(
        "[WebRTC] Remote stream received",
      );

      this.onRemoteStream(stream);
    };


    this.peer.onconnectionstatechange =
      () => {
        const state =
          this.peer?.connectionState;

        console.log(
          "[WebRTC] Connection state:",
          state,
        );

        if (state === "connected") {
          this.onConnected();
        }
      };


    this.peer.oniceconnectionstatechange =
      () => {
        console.log(
          "[WebRTC] ICE state:",
          this.peer
            ?.iceConnectionState,
        );
      };
  }

  async initializeLocalStream(
    mediaType: CallMediaType,
  ): Promise<MediaStream> {
    if (!this.peer) {
      throw new Error(
        "Peer connection is not initialized.",
      );
    }


    if (this.localStream) {
      return this.localStream;
    }

    const stream =
      await navigator.mediaDevices.getUserMedia(
        {
          audio: true,
          video:
            mediaType === "VIDEO",
        },
      );

    this.localStream = stream;

 
    stream
      .getTracks()
      .forEach((track) => {
        this.peer!.addTrack(
          track,
          stream,
        );
      });

    console.log(
      "[WebRTC] Local stream initialized",
    );

    return stream;
  }

  async createOffer() {
    if (!this.peer) {
      throw new Error(
        "Peer connection is not initialized.",
      );
    }

    const offer =
      await this.peer.createOffer();

    await this.peer.setLocalDescription(
      offer,
    );

    console.log(
      "[WebRTC] Sending offer",
    );

    sendCallOffer(
      this.callId,
      this.remoteUserId,
      offer,
    );
  }

  async handleOffer(
    offer: RTCSessionDescriptionInit,
  ) {
    if (!this.peer) {
      throw new Error(
        "Peer connection is not initialized.",
      );
    }

    console.log(
      "[WebRTC] Received offer",
    );

    await this.peer.setRemoteDescription(
      new RTCSessionDescription(
        offer,
      ),
    );

    const answer =
      await this.peer.createAnswer();

    await this.peer.setLocalDescription(
      answer,
    );

    console.log(
      "[WebRTC] Sending answer",
    );

    sendCallAnswer(
      this.callId,
      this.remoteUserId,
      answer,
    );
  }

  async handleAnswer(
    answer: RTCSessionDescriptionInit,
  ) {
    if (!this.peer) {
      throw new Error(
        "Peer connection is not initialized.",
      );
    }

    console.log(
      "[WebRTC] Received answer",
    );

    await this.peer.setRemoteDescription(
      new RTCSessionDescription(
        answer,
      ),
    );
  }

  async handleIceCandidate(
    candidate: RTCIceCandidateInit,
  ) {
    if (!this.peer) {
      return;
    }

    console.log(
      "[WebRTC] Received ICE candidate",
    );

    await this.peer.addIceCandidate(
      new RTCIceCandidate(
        candidate,
      ),
    );
  }

  getLocalStream() {
    return this.localStream;
  }

  getRemoteConnectionState() {
    return this.peer?.connectionState;
  }

  getPeerConnection() {
    return this.peer;
  }

  cleanup() {
    console.log(
      "[WebRTC] Cleaning up",
    );

    this.localStream
      ?.getTracks()
      .forEach((track) => {
        track.stop();
      });

    this.peer?.close();

    this.localStream = null;
    this.peer = null;
  }
}