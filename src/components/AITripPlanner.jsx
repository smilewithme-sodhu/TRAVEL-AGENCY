import React, { useState } from 'react';
import { useWaypoint } from '../context/WaypointContext';
import { Sparkles, Send, Mic, Compass, Navigation, ArrowRight, Check, Hotel, Plane, Calendar } from 'lucide-react';
import { DESTINATIONS } from '../data/waypointData';

export const AITripPlanner = () => {
  const { formatPrice, navigateTo, setSelectedDestination } = useWaypoint();
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Welcome to the Waypoint AI Navigational Engine. Tell me what vibe, budget, or dates you are contemplating, and I will construct your Flight Path vector in real time.',
      cards: null,
      actionPrompt: 'Try asking: "Plan a 7-day coastal trip to Amalfi under $4,500" or "Build a high-altitude ski vector in the Swiss Alps"'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Selected inline recommendations state
  const [selectedCards, setSelectedCards] = useState([
    { type: 'flight', title: 'AZ-214 Business Flight', price: 1200 },
    { type: 'stay', title: 'Palazzo Avino Villa', price: 2100 }
  ]);

  const runningTotal = selectedCards.reduce((sum, item) => sum + item.price, 0);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    const newMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, newMsg]);
    setInputQuery('');
    setIsTyping(true);

    // AI Response matching user intent with inline rich cards
    setTimeout(() => {
      let matchedDest = DESTINATIONS[1]; // default Amalfi
      if (userText.toLowerCase().includes('tokyo') || userText.toLowerCase().includes('japan')) {
        matchedDest = DESTINATIONS[0];
      } else if (userText.toLowerCase().includes('ski') || userText.toLowerCase().includes('alps') || userText.toLowerCase().includes('swiss')) {
        matchedDest = DESTINATIONS[2];
      } else if (userText.toLowerCase().includes('safari') || userText.toLowerCase().includes('serengeti') || userText.toLowerCase().includes('africa')) {
        matchedDest = DESTINATIONS[3];
      }

      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `I have computed your optimal flight path vector for **${matchedDest.title}**. Here are the inline vector components curated for your timeline:`,
        destination: matchedDest,
        cards: [
          { type: 'flight', title: `${matchedDest.flightCode} Direct Charter`, detail: 'First Class Suite • 1-Stop Fast Track', price: Math.round(matchedDest.priceUSD * 0.35) },
          { type: 'stay', title: `${matchedDest.title.split('&')[0]} Luxury Resort`, detail: '5-Star Oceanfront View • Daily Omakase Breakfast', price: Math.round(matchedDest.priceUSD * 0.5) },
          { type: 'activity', title: 'Private Helicopter & Skipper Excursion', detail: 'VIP Guided Tour • Champagne Tasting Included', price: Math.round(matchedDest.priceUSD * 0.15) }
        ],
        actionPrompt: 'Lock in this vector into your live Flight Path Rail'
      };

      setMessages(prev => [...prev, aiReply]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: '#0E2233', minHeight: 'calc(100vh - 72px)', color: '#EDEFEA', paddingBottom: '40px' }}>
      
      {/* Persistent Mini Flight Path & Running Total Strip (Pinned to Top) */}
      <div
        className="glass-header"
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 90,
          borderBottom: '1px solid rgba(216, 220, 212, 0.15)',
          padding: '12px 24px'
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3E938C' }} />
            <span className="font-mono-data text-12" style={{ color: '#C9A455', fontWeight: 600 }}>
              AI NAVIGATOR LIVE VECTOR
            </span>
            <span className="font-mono-data text-12" style={{ color: '#9DACAF' }}>
              :: {selectedCards.length} LEGS DECIDED
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <span className="font-mono-data text-12" style={{ color: '#9DACAF', fontSize: '0.65rem' }}>
                ESTIMATED VECTOR TOTAL
              </span>
              <div className="font-mono-data text-16" style={{ fontWeight: 700, color: '#C9A455' }}>
                {formatPrice(runningTotal > 0 ? runningTotal : 3450)}
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={() => navigateTo('checkout', DESTINATIONS[1])}
              style={{ padding: '8px 16px', fontSize: '0.8rem' }}
            >
              <span>Proceed to Booking</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>

      {/* Main Chat Container */}
      <div style={{ maxWidth: '1000px', margin: '32px auto 0 auto', padding: '0 24px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '120px' }}>
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: msg.sender === 'user' ? '70%' : '85%',
                  backgroundColor: msg.sender === 'user' ? '#16304A' : '#081521',
                  border: '1px solid rgba(216, 220, 212, 0.15)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}
              >
                {/* AI Badge */}
                {msg.sender === 'ai' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Sparkles size={16} style={{ color: '#3E938C' }} />
                    <span className="font-mono-data text-12" style={{ color: '#3E938C', fontWeight: 600 }}>
                      WAYPOINT AI NAVIGATOR
                    </span>
                  </div>
                )}

                <p className="text-16" style={{ lineHeight: 1.6, color: '#EDEFEA', marginBottom: msg.cards ? '20px' : '0' }}>
                  {msg.text}
                </p>

                {/* Inline Rich Cards (Flights, Stays, Activities) */}
                {msg.cards && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>
                    {msg.cards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        style={{
                          backgroundColor: '#16304A',
                          border: '1px solid rgba(201, 164, 85, 0.3)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          justify: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3E938C' }}>
                              {card.type === 'flight' && <Plane size={16} />}
                              {card.type === 'stay' && <Hotel size={16} />}
                              {card.type === 'activity' && <Navigation size={16} />}
                              <span className="font-mono-data text-12" style={{ textTransform: 'uppercase', fontWeight: 600 }}>
                                {card.type}
                              </span>
                            </div>
                            <span className="font-mono-data text-14" style={{ color: '#C9A455', fontWeight: 700 }}>
                              {formatPrice(card.price)}
                            </span>
                          </div>

                          <div className="font-display text-16" style={{ fontWeight: 600, color: '#EDEFEA', marginBottom: '4px' }}>
                            {card.title}
                          </div>
                          <div className="text-12" style={{ color: '#9DACAF' }}>
                            {card.detail}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedCards(prev => [...prev, card]);
                            if (msg.destination) {
                              setSelectedDestination(msg.destination);
                            }
                          }}
                          className="btn-secondary"
                          style={{
                            marginTop: '16px',
                            padding: '6px 12px',
                            fontSize: '0.75rem',
                            justifyContent: 'center',
                            borderColor: 'rgba(62, 147, 140, 0.5)',
                            color: '#EDEFEA'
                          }}
                        >
                          <Check size={14} style={{ color: '#3E938C' }} />
                          <span>Add to Flight Path</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Prompt Action Guidance */}
                {msg.actionPrompt && (
                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(216, 220, 212, 0.1)', display: 'flex', alignItems: 'center', justify: 'space-between' }}>
                    <span className="font-mono-data text-12" style={{ color: '#9DACAF' }}>
                      {msg.actionPrompt}
                    </span>
                    {msg.destination && (
                      <button
                        className="btn-primary"
                        onClick={() => navigateTo('detail', msg.destination)}
                        style={{ padding: '6px 14px', fontSize: '0.75rem' }}
                      >
                        <span>View Full Itinerary</span>
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                )}

              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9DACAF' }}>
              <Sparkles size={16} className="spin-icon" style={{ color: '#3E938C' }} />
              <span className="font-mono-data text-12">Computing optimal vector arcs...</span>
            </div>
          )}

        </div>

        {/* Input Bar (Fixed at Bottom) */}
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '960px',
            zIndex: 100
          }}
        >
          <form
            onSubmit={handleSendMessage}
            style={{
              backgroundColor: '#16304A',
              border: '1px solid rgba(201, 164, 85, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 12px 8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 12px 36px rgba(0,0,0,0.5)'
            }}
          >
            {/* Mic Button */}
            <button
              type="button"
              title="Voice Navigation (Secondary Input)"
              style={{
                background: 'none',
                border: 'none',
                color: '#9DACAF',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Mic size={18} />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask Waypoint AI (e.g., 'Plan a 9-day high-speed train tour across Tokyo and Kyoto')..."
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#EDEFEA',
                fontSize: '0.95rem'
              }}
            />

            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '10px 18px' }}
            >
              <span>Transmit</span>
              <Send size={16} />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
