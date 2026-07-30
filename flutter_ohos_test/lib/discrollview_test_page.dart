import 'package:flutter/material.dart';
import 'package:discrollview/discrollview.dart';

/// Demo page for Discrollview — showcases all 6 transform types.
///
/// Every testable UI element carries a stable semantic [Key] for
/// black-box test automation and manual verification traceability.
/// Key naming: `dv_<widget>_<role>`.
class DiscrollviewTestPage extends StatelessWidget {
  const DiscrollviewTestPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: const Key('dv_page_scaffold'),
      appBar: AppBar(
        key: const Key('dv_appbar'),
        title: const Text('Discrollview Demo'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: DiscrollveWidget(
        controller: null, // use internal default
        children: [
          // ============================================================
          // F-01-02: Static header (full viewport height, config.none)
          // ============================================================
          DiscrollveContent.child(
            config: DiscrollveConfig.none,
            child: _buildHeader(context),
          ),

          // ============================================================
          // Card 1: F-03-01 / F-04-01 / F-07-02 — alpha + fromBottom, threshold 0.2
          // ============================================================
          DiscrollveContent.child(
            config: const DiscrollveConfig(
              alpha: true,
              translation: DiscrollveDirection.fromBottom,
              threshold: 0.2,
            ),
            child: _buildCard(
              key: const Key('dv_card_alpha_bottom'),
              label: 'Alpha + fromBottom (threshold 0.2)',
              color: const Color(0xFF007788),
              height: 200,
              icon: Icons.vertical_align_bottom,
            ),
          ),

          // ============================================================
          // Card 2: F-03-02 / F-03-03 / F-03-04 — scaleX + scaleY
          // ============================================================
          DiscrollveContent.child(
            config: const DiscrollveConfig(scaleX: true, scaleY: true),
            child: _buildCard(
              key: const Key('dv_card_scale_xy'),
              label: 'Scale X + Y',
              color: const Color(0xFFE91E63),
              height: 180,
              icon: Icons.zoom_out_map,
            ),
          ),

          // ============================================================
          // Card 3: F-04-03 — alpha + fromLeft, threshold 0.3
          // ============================================================
          DiscrollveContent.child(
            config: const DiscrollveConfig(
              alpha: true,
              translation: DiscrollveDirection.fromLeft,
              threshold: 0.3,
            ),
            child: _buildCard(
              key: const Key('dv_card_alpha_left'),
              label: 'Alpha + fromLeft (threshold 0.3)',
              color: const Color(0xFF4CAF50),
              height: 200,
              icon: Icons.arrow_forward,
            ),
          ),

          // ============================================================
          // Card 4: F-03-05 — fromColor + toColor + alpha
          // ============================================================
          DiscrollveContent.child(
            config: const DiscrollveConfig(
              fromColor: 0xFF88EE66,
              toColor: 0xFF000000,
              alpha: true,
            ),
            child: _buildCard(
              key: const Key('dv_card_bgcolor'),
              label: 'BG Color + Alpha',
              color: const Color(0xFF000000),
              height: 200,
              icon: Icons.color_lens,
            ),
          ),

          // ============================================================
          // Card 5: F-04-02 — alpha + fromTop
          // ============================================================
          DiscrollveContent.child(
            config: const DiscrollveConfig(
              alpha: true,
              translation: DiscrollveDirection.fromTop,
            ),
            child: _buildCard(
              key: const Key('dv_card_alpha_top'),
              label: 'Alpha + fromTop',
              color: const Color(0xFFFF9800),
              height: 200,
              icon: Icons.arrow_downward,
            ),
          ),

          // ============================================================
          // Card 6: F-04-04 — alpha + fromRight, threshold 0.4
          // ============================================================
          DiscrollveContent.child(
            config: const DiscrollveConfig(
              alpha: true,
              translation: DiscrollveDirection.fromRight,
              threshold: 0.4,
            ),
            child: _buildCard(
              key: const Key('dv_card_alpha_right'),
              label: 'Alpha + fromRight (threshold 0.4)',
              color: const Color(0xFF9C27B0),
              height: 200,
              icon: Icons.arrow_back,
            ),
          ),

          // ============================================================
          // Card 7: F-06-01 / F-04-05 — all transforms combined
          // ============================================================
          DiscrollveContent.child(
            config: const DiscrollveConfig(
              alpha: true,
              scaleX: true,
              scaleY: true,
              translation:
                  DiscrollveDirection.fromBottom | DiscrollveDirection.fromLeft,
              threshold: 0.2,
            ),
            child: _buildCard(
              key: const Key('dv_card_all_combined'),
              label: 'All: Alpha + Scale + fromBottomLeft (threshold 0.2)',
              color: const Color(0xFF00BCD4),
              height: 220,
              icon: Icons.star,
            ),
          ),

          // ============================================================
          // F-02-02 / F-08-02: Static none-config footer
          // ============================================================
          DiscrollveContent.child(
            config: DiscrollveConfig.none,
            child: Container(
              key: const Key('dv_footer_static'),
              height: 100,
              color: Colors.transparent,
              child: const Center(
                child: Text(
                  'Scroll back up to reset — all transforms reverse',
                  key: Key('dv_label_reset_hint'),
                  style: TextStyle(color: Colors.grey, fontSize: 14),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Container(
      key: const Key('dv_header_static'),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF1A237E), Color(0xFF283593)],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: const Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.view_carousel, size: 64, color: Colors.white70),
            SizedBox(height: 16),
            Text(
              'Discrollview Demo',
              key: Key('dv_label_title'),
              style: TextStyle(
                color: Colors.white,
                fontSize: 28,
                fontWeight: FontWeight.bold,
                fontFamily: 'serif',
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Scroll down to see discrollve effects',
              key: Key('dv_label_subtitle'),
              style: TextStyle(color: Colors.white60, fontSize: 14),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCard({
    Key? key,
    required String label,
    required Color color,
    required double height,
    IconData icon = Icons.animation,
  }) {
    return Container(
      key: key,
      height: height,
      width: double.infinity,
      margin: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: color.withValues(alpha: 0.4),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 36, color: Colors.white70),
            const SizedBox(height: 8),
            Text(
              label,
              key: key != null ? ValueKey('${key.toString()}_label') : null,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
