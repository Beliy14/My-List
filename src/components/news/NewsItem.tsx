import React, { useEffect } from 'react';
import { INews } from '../../models/INews';
import './newsBlock.css';
import penIcon from '../../assets/pen.png';
import closeIcon from '../../assets/close.png';

interface NewsItemProps {
    news: INews;
    close: (news: INews) => void;
    update: (news: INews) => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ news, close, update }) => {

    const deleteNews = (event: React.MouseEvent) => {
        event.stopPropagation();
        close(news);
    }

    const updateTitleNews = (event: React.MouseEvent) => {
        event.stopPropagation();
        const title = prompt('Update title:') || news.title;
        if (title !== news.title) {
            const time = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
            const status = 'Update';
            update({ ...news, title, time, status });
        }
    }

    const updateContentNews = (event: React.MouseEvent) => {
        event.stopPropagation();
        const content = prompt('Update content:') || news.content;
        if (content !== news.content) {
            const time = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
            const status = 'Update';
            update({ ...news, content, time, status });
        }
    }

    useEffect(() => {
        const penIcons = document.getElementsByClassName('pen-icon');
        Array.from(penIcons).forEach(icon => {
            icon.addEventListener('click', () => {
                const parentElement = icon.parentElement;
                if (parentElement) {
                    const updateDiv = parentElement.querySelector('.update-div');
                    if (updateDiv instanceof HTMLElement) {
                        updateDiv.style.zIndex = '100';
                        updateDiv.style.opacity = '1';
                    }
                }
            });
        });

        const updateDivs = document.getElementsByClassName('update-div');
        Array.from(updateDivs).forEach(updateDiv => {
            const spans = updateDiv.querySelectorAll('span');
            spans.forEach(span => {
                span.addEventListener('click', () => {
                    if (updateDiv instanceof HTMLElement) {
                        updateDiv.style.zIndex = '-1';
                        updateDiv.style.opacity = '0';
                    }
                });
            });
        });

        // Cleanup function to remove event listeners
        return () => {
            Array.from(penIcons).forEach(icon => {
                icon.removeEventListener('click', () => {
                    const parentElement = icon.parentElement;
                    if (parentElement) {
                        const updateDiv = parentElement.querySelector('.update-div');
                        if (updateDiv instanceof HTMLElement) {
                            updateDiv.style.zIndex = '100';
                            updateDiv.style.opacity = '1';
                        }
                    }
                });
            });

            Array.from(updateDivs).forEach(updateDiv => {
                const spans = updateDiv.querySelectorAll('span');
                spans.forEach(span => {
                    span.removeEventListener('click', () => {
                        if (updateDiv instanceof HTMLElement) {
                            updateDiv.style.zIndex = '-1';
                            updateDiv.style.opacity = '0';
                        }
                    });
                });
            });
        };
    }, []);

    return (
        <div className="news-block">
            <img className='pen-icon' src={penIcon} alt="Update" />
            <img className='close-icon' src={closeIcon} alt="Close" onClick={deleteNews} />

            <span className='update-div'>
                <span onClick={updateTitleNews}>Title </span> <hr />
                <span onClick={updateContentNews}> Content</span>
            </span>

            <p className='news-status'>{news.status}</p>
            <div>
                <h4>{news.title}</h4>
                <span className='news-time'>{news.time}</span>
                <p className='news-content'>{news.content}</p>
            </div>

        </div>
    );
};

export default NewsItem;