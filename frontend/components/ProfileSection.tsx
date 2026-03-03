import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomProfileImage } from '@/components/CustomImage';
import { IconButton } from '@/components/IconButton';
import EditIcon from '@/assets/images/edit-icon';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { useUserProfile } from '@/hooks/useUserProfile';

interface ProfileSectionProps {
  showGreeting?: boolean;
}

export function ProfileSection({ showGreeting = false }: ProfileSectionProps) {
  const { profile, isLoading } = useUserProfile();
  
  const fullName = `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || 'Usuário';

  if (isLoading) {
    return (
      <View style={styles.profileSection}>
        <View style={styles.profilePic}>
          <ActivityIndicator size="small" color={Colors.light.primary} />
        </View>
        <View style={styles.profileInfo}>
          <ActivityIndicator size="small" color={Colors.light.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.profileSection}>
      <CustomProfileImage
        source={profile?.profilePicUrl || null}
        fullName={fullName}
        style={styles.profilePic}
        expandable={true}
      />
      <View style={styles.profileInfo}>
        {showGreeting && (
          <Text style={styles.greetingsText}>Bem-vindo(a),</Text>
        )}
        <View style={styles.nameRow}>
          <Text style={styles.profileName} numberOfLines={1} ellipsizeMode="tail">
            {fullName}
          </Text>
          <IconButton
            onPress={() => router.push('/(stacks)/edit-profile')}
            innerSize={showGreeting ? 20 : 18}
            outerboxRadius={showGreeting ? 12 : 6}
            borders={{ right: true, bottom: true }}
          >
            <EditIcon 
              width={showGreeting ? 20 : 18} 
              height={showGreeting ? 20 : 18} 
              color={Colors.light.primary} 
            />
          </IconButton>
        </View>
        {!showGreeting && (
          <Pressable onPress={() => router.push('/(stacks)/edit-profile')}>
            <Text style={styles.editProfileText}>Editar perfil</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
    marginBottom: 12,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
  },
  greetingsText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.text[30],
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  profileName: {
    flexShrink: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: Colors.light.text[5],
  },
  editProfileText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.light.primary,
  },
});
