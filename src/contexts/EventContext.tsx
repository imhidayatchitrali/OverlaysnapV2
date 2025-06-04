// import React, { createContext, useContext, useState } from 'react';
// import { 
//   collection, 
//   addDoc, 
//   // updateDoc, 
//   doc, 
//   getDocs, 
//   query, 
//   where, 
//   getDoc,
//   deleteDoc
// } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// // import { firestore, storage } from '../firebase';
// // import { useAuth } from './AuthContext';

// export interface Event {
//   id: string;
//   name: string;
//   date: Date;
//   imageUrl: string;
//   code: string;
//   creatorId: string;
//   createdAt: Date;
// }

// export interface Photo {
//   id: string;
//   eventId: string;
//   imageUrl: string;
//   overlayId: string | null;
//   createdBy: string;
//   createdAt: Date;
// }

// interface EventContextProps {
//   createEvent: (name: string, date: Date, image: File) => Promise<string>;
//   joinEvent: (eventCode: string) => Promise<Event>;
//   getEvent: (eventId: string) => Promise<Event>;
//   getUserEvents: () => Promise<Event[]>;
//   uploadPhoto: (eventId: string, photo: File, overlayId: string | null) => Promise<string>;
//   getEventPhotos: (eventId: string) => Promise<Photo[]>;
//   deleteEvent: (eventId: string) => Promise<void>;
// }

// const EventContext = createContext<EventContextProps | null>(null);

// export const useEvent = () => {
//   const context = useContext(EventContext);
//   if (!context) {
//     throw new Error('useEvent must be used within an EventProvider');
//   }
//   return context;
// };

// export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { currentUser } = {currentUser:""};
//   // const { currentUser } = useAuth();

//   const generateEventCode = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let code = '';
//     for (let i = 0; i < 6; i++) {
//       code += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return code;
//   };

//   const createEvent = async (name: string, date: Date, image: File) => {
//     if (!currentUser) throw new Error('User must be logged in to create an event');

//     try {
//       // Upload event image to storage
//       const imageRef = ref(storage, `events/${currentUser.uid}/${Date.now()}_${image.name}`);
//       const snapshot = await uploadBytes(imageRef, image);
//       const imageUrl = await getDownloadURL(snapshot.ref);

//       // Create event document in Firestore
//       const eventCode = generateEventCode();
//       const eventData = {
//         name,
//         date,
//         imageUrl,
//         code: eventCode,
//         creatorId: currentUser.uid,
//         createdAt: new Date()
//       };

//       const docRef = await addDoc(collection(firestore, 'events'), eventData);
//       return docRef.id;
//     } catch (error) {
//       console.error('Error creating event:', error);
//       throw error;
//     }
//   };

//   const joinEvent = async (eventCode: string) => {
//     try {
//       // Query events by code
//       const eventsRef = collection(firestore, 'events');
//       const q = query(eventsRef, where('code', '==', eventCode.toUpperCase()));
//       const querySnapshot = await getDocs(q);

//       if (querySnapshot.empty) {
//         throw new Error('Event not found');
//       }

//       const eventDoc = querySnapshot.docs[0];
//       const eventData = eventDoc.data();

//       return {
//         id: eventDoc.id,
//         ...eventData,
//         date: eventData.date.toDate(),
//         createdAt: eventData.createdAt.toDate()
//       } as Event;
//     } catch (error) {
//       console.error('Error joining event:', error);
//       throw error;
//     }
//   };

//   const getEvent = async (eventId: string) => {
//     try {
//       const eventDoc = await getDoc(doc(firestore, 'events', eventId));
      
//       if (!eventDoc.exists()) {
//         throw new Error('Event not found');
//       }
      
//       const eventData = eventDoc.data();
      
//       return {
//         id: eventDoc.id,
//         ...eventData,
//         date: eventData.date.toDate(),
//         createdAt: eventData.createdAt.toDate()
//       } as Event;
//     } catch (error) {
//       console.error('Error getting event:', error);
//       throw error;
//     }
//   };

//   const getUserEvents = async () => {
//     if (!currentUser) throw new Error('User must be logged in to view events');

//     try {
//       const eventsRef = collection(firestore, 'events');
//       const q = query(eventsRef, where('creatorId', '==', currentUser.uid));
//       const querySnapshot = await getDocs(q);

//       return querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//         date: doc.data().date.toDate(),
//         createdAt: doc.data().createdAt.toDate()
//       } as Event));
//     } catch (error) {
//       console.error('Error getting user events:', error);
//       throw error;
//     }
//   };

//   const uploadPhoto = async (eventId: string, photo: File, overlayId: string | null) => {
//     if (!currentUser) throw new Error('User must be logged in to upload a photo');

//     try {
//       // Upload photo to storage
//       const photoRef = ref(storage, `photos/${eventId}/${Date.now()}_${photo.name}`);
//       const snapshot = await uploadBytes(photoRef, photo);
//       const imageUrl = await getDownloadURL(snapshot.ref);

//       // Create photo document in Firestore
//       const photoData = {
//         eventId,
//         imageUrl,
//         overlayId,
//         createdBy: currentUser.uid,
//         createdAt: new Date()
//       };

//       const docRef = await addDoc(collection(firestore, 'photos'), photoData);
//       return docRef.id;
//     } catch (error) {
//       console.error('Error uploading photo:', error);
//       throw error;
//     }
//   };

//   const getEventPhotos = async (eventId: string) => {
//     try {
//       const photosRef = collection(firestore, 'photos');
//       const q = query(photosRef, where('eventId', '==', eventId));
//       const querySnapshot = await getDocs(q);

//       return querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//         createdAt: doc.data().createdAt.toDate()
//       } as Photo));
//     } catch (error) {
//       console.error('Error getting event photos:', error);
//       throw error;
//     }
//   };

//   const deleteEvent = async (eventId: string) => {
//     if (!currentUser) throw new Error('User must be logged in to delete an event');

//     try {
//       // Get the event to check ownership
//       const eventDoc = await getDoc(doc(firestore, 'events', eventId));
      
//       if (!eventDoc.exists()) {
//         throw new Error('Event not found');
//       }
      
//       const eventData = eventDoc.data();
      
//       // Check if the current user is the creator or an admin
//       if (eventData.creatorId !== currentUser.uid && !currentUser.isAdmin) {
//         throw new Error('Unauthorized to delete this event');
//       }
      
//       // Delete the event
//       await deleteDoc(doc(firestore, 'events', eventId));
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       throw error;
//     }
//   };

//   const value = {
//     createEvent,
//     joinEvent,
//     getEvent,
//     getUserEvents,
//     uploadPhoto,
//     getEventPhotos,
//     deleteEvent
//   };

//   return (
//     <EventContext.Provider value={value}>
//       {children}
//     </EventContext.Provider>
//   );
// };