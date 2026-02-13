import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useArticles } from '../context/ArticlesContext';
import BottomNavBar from '../components/BottomNavBar';

// --- Компонент Карточки Статьи ---
const ArticleCard = ({ article, isExpanded, onClick }) => {
    const showBackButton = isExpanded;
    
    return (
        <TouchableOpacity 
            style={[styles.card, isExpanded && styles.cardExpanded]} 
            onPress={() => !showBackButton && onClick(article.id)}
            activeOpacity={showBackButton ? 1 : 0.7} // Отключаем нажатие, если открыто
        >
            <Text style={styles.title}>{article.title}</Text>
            <View style={styles.meta}>
                <Text style={styles.author}>{article.author}</Text>
                <Text style={styles.date}>{article.date}</Text>
            </View>
            
            <Text
                style={styles.content}
                numberOfLines={isExpanded ? undefined : 3} // в свернутом виде показываем только первые строки
            >
                {article.fullText}
            </Text>

            {showBackButton && (
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={(e) => {
                        e.stopPropagation(); // Предотвращаем срабатывание родительского onPress
                        onClick(null);
                    }}
                >
                    <Text style={styles.backButtonText}>← Вернуться к списку</Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
};


// --- Основной Компонент Ленты Новостей ---
const NewsFeedScreen = ({ navigation }) => {
    const [expandedArticleId, setExpandedArticleId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { articles } = useArticles();

    const handleCardClick = (id) => {
        setExpandedArticleId(id);
    };

    const filteredArticles = articles.filter(article => {
        const q = searchTerm.trim().toLocaleLowerCase('ru-RU');
        if (!q) return true;
        const haystack = [
            article.title,
            article.preview,
            article.fullText,
        ]
            .join(' ')
            .toLocaleLowerCase('ru-RU');
        return haystack.includes(q);
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Поисковая строка */}
                <View style={styles.searchBarWrapper}>
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="Поиск"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <Text style={styles.searchIcon}>🔍</Text>
                </View>

                {/* Список статей (ScrollView для прокрутки) */}
                <ScrollView style={styles.articlesList}>
                    {filteredArticles.map(article => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            isExpanded={expandedArticleId === article.id}
                            onClick={handleCardClick}
                        />
                    ))}
                </ScrollView>

                {/* Нижняя навигация */}
                <BottomNavBar
                    activeTab="home"
                    onTabChange={(tab) => {
                        if (tab === 'wordle') {
                            navigation.navigate('WordleIntro');
                        } else if (tab === 'add') {
                            navigation.navigate('AddArticle');
                        } else if (tab === 'chat') {
                            navigation.navigate('Chat');
                        } else if (tab === 'profile') {
                            navigation.navigate('Profile');
                        } else {
                            console.log('Tab pressed:', tab);
                        }
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

// --- Стилизация ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF5E8', // Фон
    },
    container: {
        flex: 1,
        paddingTop: 20, // Имитация отступа от статус бара
    },
    
    // --- Поиск ---
    searchBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        height: 45,
        paddingHorizontal: 15,
        borderRadius: 25,
        backgroundColor: '#E0EEEA', // Светло-зеленый
        fontSize: 16,
        color: '#0A1917',
    },
    searchIcon: {
        position: 'absolute',
        right: 35,
        fontSize: 18,
        color: '#777',
    },

    // --- Статьи ---
    articlesList: {
        flex: 1,
        paddingHorizontal: 15,
    },
    card: {
        backgroundColor: '#A0D9D1', // Цвет карточки
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    cardExpanded: {
        // Стили для открытого состояния могут быть добавлены здесь
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0A1917',
        marginBottom: 5,
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    author: {
        fontSize: 12,
        color: '#1B5E51',
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        color: '#1B5E51',
    },
    content: {
        fontSize: 14,
        lineHeight: 20,
        color: '#0A1917',
    },
    backButton: {
        marginTop: 15,
        padding: 8,
        backgroundColor: '#FF8C00', // Оранжевый акцент
        borderRadius: 20,
        alignItems: 'center',
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

});

export default NewsFeedScreen;