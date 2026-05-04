import React, { useState, useEffect } from 'react';
import './MatchCenter.css';

const MatchCenter = () => {
  return (
    <section className="match-center-wrapper">
      <div className="match-blocks">
        {/* Last Matches */}
        <div className="match-block last-matches">
          <h3 className="block-title">LAST MATCHES:</h3>
          <div className="matches-container">
            {/* Match 1 */}
            <div className="match-item">
              <div className="match-date">
                <span className="day">12</span>
                <span className="month">Apr</span>
              </div>
              <div className="match-details">
                <div className="competition">PREMIER LEAGUE - 15:00</div>
                <div className="teams">
                  <div className="team-row">
                    <span className="team-name opponent">ASTON VILLA</span>
                    <span className="score">0</span>
                  </div>
                  <div className="team-row">
                    <span className="team-name arsenal">ARSENAL</span>
                    <span className="score highlight">2</span>
                  </div>
                </div>
                <button className="match-btn">MATCHROOM</button>
              </div>
            </div>

            {/* Match 2 */}
            <div className="match-item">
              <div className="match-date">
                <span className="day">20</span>
                <span className="month">Apr</span>
              </div>
              <div className="match-details">
                <div className="competition">PREMIER LEAGUE - 20:00</div>
                <div className="teams">
                  <div className="team-row">
                    <span className="team-name arsenal">ARSENAL</span>
                    <span className="score highlight">3</span>
                  </div>
                  <div className="team-row">
                    <span className="team-name opponent">CHELSEA</span>
                    <span className="score">1</span>
                  </div>
                </div>
                <button className="match-btn">MATCHROOM</button>
              </div>
            </div>
          </div>
        </div>

        {/* Next Match */}
        <div className="match-block next-match">
          <h3 className="block-title">NEXT MATCH:</h3>
          <div className="match-item">
            <div className="match-date">
              <span className="day">27</span>
              <span className="month">Apr</span>
            </div>
            <div className="match-details">
              <div className="competition-row">
                <div className="competition">PREMIER LEAGUE - 16:30</div>
                <div className="stats-grid header">
                  <span className="stat">WIN</span>
                  <span className="stat">% WIN</span>
                  <span className="stat">GOAL</span>
                </div>
              </div>
              <div className="teams">
                <div className="team-row">
                  <span className="team-name opponent">TOTTENHAM</span>
                  <div className="stats-grid">
                    <span className="stat-val">17</span>
                    <span className="stat-val">26%</span>
                    <span className="stat-val">64</span>
                  </div>
                </div>
                <div className="team-row">
                  <span className="team-name arsenal">ARSENAL</span>
                  <div className="stats-grid">
                    <span className="stat-val">30</span>
                    <span className="stat-val">46%</span>
                    <span className="stat-val">85</span>
                  </div>
                </div>
              </div>
              <button className="match-btn outline">STANDINGS</button>
            </div>
          </div>

          {/* Countdown Block (Absolute positioned on top right of Next Match) */}
          <div className="clock-block">
            <div className="countdown-label">PREMIER LEAGUE</div>
            <div className="countdown-val">1 DAY TO GO</div>
            <div className="countdown-sub">SAT 27 APRIL • 16:30</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchCenter;
